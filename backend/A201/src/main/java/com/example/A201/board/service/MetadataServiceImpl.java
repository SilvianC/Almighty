package com.example.A201.board.service;

import com.example.A201.battery.domain.Battery;
import com.example.A201.board.domain.Metadata;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.board.repository.MetadataRepository;
import com.example.A201.board.vo.MetadataResponse;
import com.example.A201.exception.CustomException;
import com.example.A201.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MetadataServiceImpl implements MetadataService {

    private final MetadataRepository metadataRepository;
    private final BatteryRepository batteryRepository;

    @Override
    public List<MetadataResponse> getMetadataCode(String code) {
        Battery battery = batteryRepository.findByCode(code).orElseThrow(
                () -> new CustomException(ErrorCode.BATTERY_NOT_FOUND));
        List<Metadata> metadata = metadataRepository.findByBatteryId(battery);

        if (metadata.isEmpty()) throw new CustomException(ErrorCode.METADATA_NOT_FOUND);

        return metadata.stream().map(m -> MetadataResponse.MetadataResponse(m))
                .collect(Collectors.toList());
    }

    @Override
    public List<MetadataResponse> getMetadataType(String code, String type) {
        Battery battery = batteryRepository.findByCode(code).orElseThrow(
                () -> new CustomException(ErrorCode.BATTERY_NOT_FOUND));
        List<Metadata> metadata = metadataRepository.findByBatteryIdAndType(battery, type);

        if (metadata.isEmpty()) throw new CustomException(ErrorCode.METADATA_NOT_FOUND);

        return metadata.stream().map(m -> MetadataResponse.MetadataResponse(m))
                .collect(Collectors.toList());
    }
}
