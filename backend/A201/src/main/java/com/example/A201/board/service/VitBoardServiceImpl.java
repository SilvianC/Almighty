package com.example.A201.board.service;

import com.example.A201.board.repository.VitBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VitBoardServiceImpl implements VitBoardService{

    private final VitBoardRepository vitBoardRepository;


}
