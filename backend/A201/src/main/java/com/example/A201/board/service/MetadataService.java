package com.example.A201.board.service;

import com.example.A201.board.vo.MetadataResponse;

import java.util.List;

public interface MetadataService {
    List<MetadataResponse> getMetadataCode(String code);
    List<MetadataResponse> getMetadataType(String code,String type);
}
