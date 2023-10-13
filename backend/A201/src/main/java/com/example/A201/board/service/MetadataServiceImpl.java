package com.example.A201.board.service;

import com.example.A201.board.domain.Battery;
import com.example.A201.board.domain.Metadata;
import com.example.A201.board.repository.BatteryRepository;
import com.example.A201.board.repository.MetadataRepository;
import com.example.A201.board.vo.MetadataResponse;
import com.example.A201.exception.CustomException;
import com.example.A201.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetadataServiceImpl implements MetadataService{
    private final MetadataRepository metadataRepository;
    private final BatteryRepository batteryRepository;

    @Override
    public List<MetadataResponse> getMetadataCode(String code) {
        Battery battery = batteryRepository.findByCode(code).orElseThrow(
                () -> new CustomException(ErrorCode.BATTERY_NOT_FOUND));
        List<Metadata> metadata = metadataRepository.findByBatteryId(battery).orElseThrow(
                () -> new CustomException(ErrorCode.METADATA_NOT_FOUND));
        return null;
    }

    @Override
    public List<MetadataResponse> getMetadataType(String code) {
        return null;
    }
}
