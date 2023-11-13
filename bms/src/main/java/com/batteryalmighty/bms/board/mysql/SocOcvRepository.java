package com.batteryalmighty.bms.board.mysql;

import com.batteryalmighty.bms.board.domain.SocOcv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SocOcvRepository extends JpaRepository<SocOcv, Long> {

    @Query("select so from SocOcv so order by abs(so.soc - :value) ")
    List<SocOcv> findBySoc(@Param("value") double value, Pageable pageable);

    @Query("select so from SocOcv so order by abs(so.ocv - :value) ")
    List<SocOcv> findByValue(@Param("value")double value, Pageable pageable);
}
