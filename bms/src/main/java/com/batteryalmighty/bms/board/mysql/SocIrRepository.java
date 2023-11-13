package com.batteryalmighty.bms.board.mysql;

import com.batteryalmighty.bms.board.domain.SocIr;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SocIrRepository extends JpaRepository<SocIr, Long> {

    @Query("select si from SocIr si order by abs(si.soc - :value) ")
    List<SocIr> findBySoc(@Param("value") double value, Pageable pageable);

    @Query("select si from SocIr si order by abs(si.ir - :value) ")
    List<SocIr> findByValue(@Param("value") double value, Pageable pageable);
}
