package com.batteryalmighty.bms.domain.mongo;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "vit_sequences")
public class VitSeqeunce {

    @Id
    private String id;

    private Long seq;


}
