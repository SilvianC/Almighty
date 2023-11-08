package com.batteryalmighty.bms.processing;

import com.batteryalmighty.bms.domain.mysql.SocIr;
import com.batteryalmighty.bms.domain.mysql.SocOcv;
import com.batteryalmighty.bms.repository.mysql.SocIrRepository;
import com.batteryalmighty.bms.repository.mysql.SocOcvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class Ekf {
    private double Q = 2E-06;
    private int R = 2500;
    private double P = 0.006;
    private double P_;
    private double ir;
    private double ocv;

    private double x_;
    private double x = 100;
    private double K;

    private double H;

    private final SocIrRepository socIrRepository;

    private final SocOcvRepository socOcvRepository;

    public void init(){
        Q = 2E-06;
        R = 2500;
        P = 0.006;
        x = 100;
    }

    public void predictx_(double volt){
        PageRequest pageable = PageRequest.of(0, 2);
        List<SocOcv> socOcvs = socOcvRepository.findByValue(volt, pageable);
        x_ = socOcvs.get(0).getSoc() - (socOcvs.get(0).getOcv() - volt) * (socOcvs.get(0).getSoc() - socOcvs.get(1).getSoc()) / (socOcvs.get(0).getOcv() - socOcvs.get(1).getOcv());
    }

    public void predictP(){
        P_ = P + Q;
    }

    public void kalmanGain(double current, double volt){
        PageRequest pageable = PageRequest.of(0, 2);
        List<SocOcv> socOcvs = socOcvRepository.findByValue(volt, pageable);
        SocOcv socOcvPredict1 = socOcvs.get(0);
        SocOcv socOcvPredict2 = socOcvs.get(1);
        PageRequest pageable2 = PageRequest.of(0, 1);
        SocIr ir1 = socIrRepository.findBySoc(socOcvPredict1.getSoc(), pageable2).get(0);
        SocIr ir2 = socIrRepository.findBySoc(socOcvPredict2.getSoc(), pageable2).get(0);
        ir = ir1.getIr() - (ir1.getSoc() - x_) * (ir1.getIr() - ir2.getIr()) / (ir1.getSoc() - ir2.getSoc());
        double a = (socOcvPredict1.getOcv() - volt) / (socOcvPredict1.getSoc() - x_);
        double b = (ir1.getIr() - ir) / (socOcvPredict1.getSoc() - x_);
        H = ((socOcvPredict1.getOcv() - volt) / (socOcvPredict1.getSoc() - x_)) + ((current)*((ir1.getIr() - ir) / (socOcvPredict1.getSoc() - x_)));
        K = P_ * H * (H * P_ * H + R);
    }

    public void predictx(double volt){
        PageRequest pageable = PageRequest.of(0, 2);
        List<SocOcv> socOcvs = socOcvRepository.findBySoc(x_, pageable);
        List<SocIr> socIrs = socIrRepository.findBySoc(x_, pageable);
        ocv = socOcvs.get(0).getOcv() - (socOcvs.get(0).getSoc() - x_) * (socOcvs.get(0).getOcv() - socOcvs.get(1).getOcv()) / (socOcvs.get(0).getSoc() - socOcvs.get(1).getSoc());
        ir = socIrs.get(0).getIr() - (socIrs.get(0).getSoc() - x_) * (socIrs.get(0).getIr() - socIrs.get(1).getIr()) / (socIrs.get(0).getSoc() - socIrs.get(1).getSoc());
        x = x_ + K * (volt - (ocv + ir));
    }

    public void nextP(){
        P = -1 * K * H * P_;
    }

    public double get(){
        return x;
    }
}
