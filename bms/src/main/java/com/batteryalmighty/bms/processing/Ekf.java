package com.batteryalmighty.bms.processing;

import com.batteryalmighty.bms.domain.SocIr;
import com.batteryalmighty.bms.domain.SocOcv;
import com.batteryalmighty.bms.repository.SocIrRepository;
import com.batteryalmighty.bms.repository.SocOcvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    private List<SocOcv> socOcvs;

    private List<SocIr> socIrs;

    private SocOcv nearOcv[];

    private SocIr nearIr[];

    private final SocIrRepository socIrRepository;

    private final SocOcvRepository socOcvRepository;

    public void init(){
        Q = 2E-06;
        R = 2500;
        P = 0.006;
        x = 100;
        socOcvs = socOcvRepository.findAll();
        socIrs = socIrRepository.findAll();
        nearOcv = new SocOcv[2];
        nearIr = new SocIr[2];
    }

    public void predictx_(double volt){
        findNear(volt);
        x_ = nearOcv[0].getSoc() - (nearOcv[0].getOcv() - volt) * (nearOcv[0].getSoc() - nearOcv[1].getSoc()) / (nearOcv[0].getOcv() - nearOcv[1].getOcv());
    }

    public void predictP(){
        P_ = P + Q;
    }

    public void kalmanGain(double current, double volt){
        SocOcv socOcvPredict1 = nearOcv[0];
        SocOcv socOcvPredict2 = nearOcv[1];
        SocIr ir1 = nearIr[0];
        SocIr ir2 = nearIr[1];
        ir = ir1.getIr() - (ir1.getSoc() - x_) * (ir1.getIr() - ir2.getIr()) / (ir1.getSoc() - ir2.getSoc());
        double a = (socOcvPredict1.getOcv() - volt) / (socOcvPredict1.getSoc() - x_);
        double b = (ir1.getIr() - ir) / (socOcvPredict1.getSoc() - x_);
        H = ((socOcvPredict1.getOcv() - volt) / (socOcvPredict1.getSoc() - x_)) + ((current)*((ir1.getIr() - ir) / (socOcvPredict1.getSoc() - x_)));
        K = P_ * H * (H * P_ * H + R);
    }

    public void predictx(double volt){
        ocv = nearOcv[0].getOcv() - (nearOcv[0].getSoc() - x_) * (nearOcv[0].getOcv() - nearOcv[1].getOcv()) / (nearOcv[0].getSoc() - nearOcv[1].getSoc());
        ir = nearIr[0].getIr() - (nearIr[0].getSoc() - x_) * (nearIr[0].getIr() - nearIr[1].getIr()) / (nearIr[0].getSoc() - nearIr[1].getSoc());
        x = x_ + K * (volt - (ocv + ir));
    }

    public void nextP(){
        P = -1 * K * H * P_;
    }

    public double get(){
        return x;
    }

    private void findNear(double volt){
        double min[] = new double[2];
        min[0] = Double.MAX_VALUE;
        min[1] = Double.MAX_VALUE;
        for (SocOcv socOcv : socOcvs) {
            double abs = Math.abs(socOcv.getOcv() - volt);
            if(abs < min[1]){
                min[1] = abs;
                nearOcv[1] = socOcv;
                if(abs<min[0]){
                    double temp = min[1];
                    min[1] = min[0];
                    nearOcv[1] = nearOcv[0];
                    min[0] = temp;
                    nearOcv[0] = socOcv;
                }
            }
        }

        double minSoc[] = new double[2];
        minSoc[0] = Double.MAX_VALUE;
        minSoc[1] = Double.MAX_VALUE;
        for (SocIr socIr : socIrs) {
            double abs1 = Math.abs(socIr.getSoc() - nearOcv[0].getSoc());
            double abs2 = Math.abs(socIr.getSoc() - nearOcv[1].getSoc());
            if(abs1 < minSoc[0]){
                minSoc[0] = abs1;
                nearIr[0] = socIr;
            }
            if(abs2 < minSoc[1]){
                minSoc[1] = abs2;
                nearIr[1] = socIr;
            }
        }
    }
}
