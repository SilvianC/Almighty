package com.example.A201.board.service;

import com.example.A201.board.vo.BoardResponse;
import com.example.A201.board.vo.VitResponse;

import java.util.List;

public interface BoardService {
    BoardResponse getBoard(Long progressId);

    List<VitResponse> getVitBoardList();
}

