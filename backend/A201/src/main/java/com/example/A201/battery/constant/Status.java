package com.example.A201.battery.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public enum Status {
    Normal, Request, Upload, Analysis, CustomerFault, SdiFault;
}