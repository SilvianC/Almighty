package com.example.A201.board.service;

import com.example.A201.board.vo.BoardResponse;

import java.util.List;

public interface BoardService {
    BoardResponse getBoard(Long progressId);
}

