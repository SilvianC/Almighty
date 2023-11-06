package com.example.A201.battery.repository;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    @Query("select p from Progress p where p.currentStatus ='Request' order by p.createDate desc")
    List<Progress> getRequestProgress();

    @Query("select p from Progress p where p.currentStatus ='CustomerFault' or p.currentStatus ='SdiFault' order by p.createDate desc")
    List<Progress> getFinishedProgress();
}
