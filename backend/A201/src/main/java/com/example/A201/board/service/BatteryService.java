package com.example.A201.board.service;

import com.example.A201.board.domain.Battery;

import java.util.Optional;

public interface BatteryService {
    Optional<Battery> getBatteries();

}
