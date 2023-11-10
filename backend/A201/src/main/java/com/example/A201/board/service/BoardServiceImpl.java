package com.example.A201.board.service;

import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.example.A201.battery.vo.response.StatusHistoryResponse;
import com.example.A201.board.domain.BmsBoard;
import com.example.A201.board.domain.VitBoard;
import com.example.A201.board.repository.BmsBoardRepository;
import com.example.A201.board.repository.VitBoardRepository;
import com.example.A201.board.vo.BmsResponse;
import com.example.A201.board.vo.BoardResponse;
import com.example.A201.board.vo.VitResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
    private final BmsBoardRepository bmsBoardRepository;
    private final VitBoardRepository vitBoardRepository;
    @Override
    public BoardResponse getBoard(Long progressId){
        BmsBoard bms = bmsBoardRepository.findByProgress(progressId).orElseThrow(() -> new EntityNotFoundException("해당 데이터 찾을 수 없습니다"));
        PageRequest pageable = PageRequest.of(0, 5000);
//        List<VitBoard> vit = vitBoardRepository.findByProgress(progressId, pageable);
        List<VitBoard> vit = vitBoardRepository.findVitBoardByProgressId(progressId);
        return BoardResponse.boardResponse(BmsResponse.bmsResponse(bms), vit.stream().map(v -> VitResponse.vitResponse(v)).collect(Collectors.toList()), BatterydataResponse.batteryResponse(bms.getProgress().getBatteryId()));
    }

    @Override
    public List<VitResponse> getVitBoardList(){
        return vitBoardRepository.findAll()
                .stream()
                .filter(Objects::nonNull)
                .map(VitResponse::vitResponse)
                .collect(Collectors.toList());
    }
}
