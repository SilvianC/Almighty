package com.example.A201.words.service;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import java.io.IOException;

public interface WordService  {

    void createWordDocument(String content, String fileName) throws IOException, InvalidFormatException;
}
