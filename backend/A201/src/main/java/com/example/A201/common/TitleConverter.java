package com.example.A201.common;

import com.example.A201.alarm.domain.constant.Title;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
@Slf4j
public class TitleConverter implements AttributeConverter<Title,String> {
    @Override
    public String convertToDatabaseColumn(Title attribute) {
        if(attribute == null) return null;
        return attribute.getTitle();
    }

    @Override
    public Title convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        try{
            return Title.fromTitle(dbData);
        }catch (IllegalArgumentException e){
            log.error("failure to convert cause unexpected title [{}]",dbData,e);
            throw e;
        }
    }
}
