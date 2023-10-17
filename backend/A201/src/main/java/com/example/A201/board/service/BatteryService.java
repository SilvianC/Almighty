package com.example.A201.board.service;

import com.example.A201.board.domain.Battery;
import com.example.A201.board.vo.BatteryResponse;

import java.util.List;
import java.util.Optional;

public interface BatteryService {
    List<BatteryResponse> getBatteries();

}
