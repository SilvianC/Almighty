package com.batteryalmighty.bms.processing;

import com.batteryalmighty.bms.domain.SocIr;
import com.batteryalmighty.bms.domain.SocOcv;
import com.batteryalmighty.bms.repository.SocIrRepository;
import com.batteryalmighty.bms.repository.SocOcvRepository;
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
    private double x;
    private double K;

    private double H;

    private final SocIrRepository socIrRepository;
    private final SocOcvRepository socOcvRepository;

    public void predictx_(double volt){
        PageRequest pageable = PageRequest.of(0, 2);
        List<SocOcv> socOcvs = socOcvRepository.findByValue(volt, pageable);
        x_ = socOcvs.get(0).getSoc() - (socOcvs.get(0).getOcv() - volt) * (socOcvs.get(0).getSoc() - socOcvs.get(1).getSoc()) / (socOcvs.get(0).getOcv() - socOcvs.get(1).getOcv());
    }

    public void predictP(){
        P_ = P + Q;
    }

    public double kalmanGain(double current, double volt){
        PageRequest pageable = PageRequest.of(0, 2);
        List<SocOcv> socOcvs = socOcvRepository.findByValue(volt, pageable);
        SocOcv socOcvPredict1 = socOcvs.get(0);
        SocOcv socOcvPredict2 = socOcvs.get(1);
        PageRequest pageable2 = PageRequest.of(0, 1);
        SocIr ir1 = socIrRepository.findBySoc(socOcvPredict1.getSoc(), pageable2).get(0);
        SocIr ir2 = socIrRepository.findBySoc(socOcvPredict2.getSoc(), pageable2).get(0);
        H = ((socOcvPredict1.getOcv() - socOcvPredict2.getOcv()) / (socOcvPredict1.getSoc() - socOcvPredict2.getSoc())) + ((current)*((ir1.getIr() - ir2.getIr()) / (ir1.getSoc() - ir2.getSoc())));
        return K = P_ * H * (H * P_ * H + R);
    }

    public void predictx(double volt){
        PageRequest pageable = PageRequest.of(0, 2);
        List<SocOcv> socOcvs = socOcvRepository.findBySoc(x_, pageable);
        List<SocIr> socIrs = socIrRepository.findBySoc(x_, pageable);
        ocv = socOcvs.get(0).getOcv() - (socOcvs.get(0).getSoc() - x) * (socOcvs.get(0).getOcv() - socOcvs.get(1).getOcv()) / (socOcvs.get(0).getSoc() - socOcvs.get(1).getSoc());
        ir = socIrs.get(0).getIr() - (socIrs.get(0).getSoc() - x) * (socIrs.get(0).getIr() - socIrs.get(1).getIr()) / (socIrs.get(0).getSoc() - socIrs.get(1).getSoc());
        x = x_ + K * (volt - (ocv + ir));
    }

    public void nextP(){
        P = -1 * K * H * P_;
    }
}
