package com.example.A201.progress.repository;

import com.example.A201.progress.domain.Progress;
import com.example.A201.progress.dto.ProgressListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    @Query("select new com.example.A201.progress.dto.ProgressListDTO(p.id,p.battery.member.company,p.battery.model.modelName,p.createDate,p.currentStatus) from Progress p where p.currentStatus ='Request' order by p.createDate desc")
//    @Query("select new com.example.A201.progress.dto.ProgressListDTO(p.id,p.battery.member.company,p.battery.model.modelName,p.createdDate,p.currentStatus) from Progress p where p.currentStatus ='Request' order by p.createdDate desc")
    List<ProgressListDTO> getRequestProgress();

    @Query("select new com.example.A201.progress.dto.ProgressListDTO(p.id,p.battery.member.company,p.battery.model.modelName,p.createDate,p.currentStatus) from Progress p where p.currentStatus = 'Expert' order by p.createDate desc")
//    @Query("select new com.example.A201.progress.dto.ProgressListDTO(p.id,p.battery.member.company,p.battery.model.modelName,p.createdDate,p.currentStatus) from Progress p where p.currentStatus = 'Expert' order by p.createdDate desc")
    List<ProgressListDTO> getFinishedProgress();
}
