package com.example.A201.words.service;

import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import java.io.IOException;

public interface WordService  {

    byte[] createWordDocument(ProgressResultDTO content, String fileName) throws IOException, InvalidFormatException;
}
