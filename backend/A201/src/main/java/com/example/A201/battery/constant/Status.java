package com.example.A201.battery.constant;

import lombok.Getter;

@Getter
public enum Status {
    Normal, Request, Upload, Analysis, CustomerFault, SdiFault;
}