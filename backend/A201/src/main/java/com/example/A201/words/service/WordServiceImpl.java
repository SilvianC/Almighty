package com.example.A201.words.service;

import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.history.constant.ResultStatus;
import com.example.A201.progress.domain.Progress;
import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import com.example.A201.progress.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.util.IOUtils;
import org.apache.poi.util.Units;
import org.apache.poi.xwpf.model.XWPFHeaderFooterPolicy;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.math.BigInteger;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Service
@RequiredArgsConstructor
public class WordServiceImpl implements WordService{
    private final ProgressRepository progressRepository;
    @Override
    public byte[] createWordDocument(ProgressResultDTO progress, String fileName) throws IOException, InvalidFormatException {
        Progress progressEntity = progressRepository.findById(progress.getProgressId()).orElseThrow(() -> new IllegalStateException("해당 배터리를 찾을 수 없습니다"));
        Battery battery = progressEntity.getBattery();
//        String directoryPath = "c:/batteryword/";
//        File directory = new File(directoryPath);

        // 디렉토리가 없으면 생성
//        if (!directory.exists()) {
//            directory.mkdirs(); // 여러 중첩 디렉토리를 생성할 수도 있으므로 mkdirs() 사용
//        }

        // 파일 생성 경로
//        String filePath = directoryPath + battery.getCode() + fileName;
        XWPFDocument document = new XWPFDocument();
        String currentDir = System.getProperty("user.dir");
        System.out.println("Current dir: " + currentDir);
        InputStream resource = getClass().getResourceAsStream("/images/sdilogo.png");
//        ClassPathResource cpr = new ClassPathResource("images/sdilogo.png");
        // 이미지 워터마크 추가
//        String imgPath = resource.getFile(); // 이미지 파일 경로
        addImageWatermark(document, resource.readAllBytes());

        XWPFParagraph titleParagraph  = document.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText("RMA 보고서");
        titleRun.setBold(true);
        titleRun.setFontSize(20); // 필요에 따라 폰트 사이즈 설정

        // 테이블 생성
        XWPFTable table = document.createTable();
        // 테이블의 너비를 설정합니다.
        table.setWidth("100%");

        // 테이블의 프로퍼티를 가져오거나 생성
        CTTblPr tblPr = table.getCTTbl().getTblPr();
        if (tblPr == null) tblPr = table.getCTTbl().addNewTblPr();

// 테이블 테두리 설정
        CTTblBorders borders = tblPr.isSetTblBorders() ? tblPr.getTblBorders() : tblPr.addNewTblBorders();

        CTBorder bottomBorder = borders.addNewBottom();
        bottomBorder.setVal(STBorder.THICK);
        bottomBorder.setSz(new BigInteger("16")); // 굵기 설정 (단위: 1/8 point)
        bottomBorder.setColor("000000"); // 검정색

        CTBorder topBorder = borders.addNewTop();
        topBorder.setVal(STBorder.THICK);
        topBorder.setSz(new BigInteger("16"));
        topBorder.setColor("000000");

        CTBorder leftBorder = borders.addNewLeft();
        leftBorder.setVal(STBorder.THICK);
        leftBorder.setSz(new BigInteger("16"));
        leftBorder.setColor("000000");

        CTBorder rightBorder = borders.addNewRight();
        rightBorder.setVal(STBorder.THICK);
        rightBorder.setSz(new BigInteger("16"));
        rightBorder.setColor("000000");

        // 첫 번째 행 설정
        XWPFTableRow rowOne = table.getRow(0); // 이미 생성된 첫 번째 행 가져오기
        setCellText(rowOne.getCell(0), "ID", true);
        setCellText(rowOne.addNewTableCell(), battery.getCode(), false);
        setCellText(rowOne.addNewTableCell(), "일자/시간", true);
        setCellText(rowOne.addNewTableCell(), LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)), false);

        // 두 번째 행 설정
        XWPFTableRow rowTwo = table.createRow();
        setCellText(rowTwo.getCell(0), "판단", true);
        setCellText(rowTwo.getCell(1), progress.getResultStatus().equals(ResultStatus.SdiFault)?"반품 승인":"반품 거절", false);
        setCellText(rowTwo.getCell(2), "기업명", true);
        setCellText(rowTwo.getCell(3), battery.getMember().getCompany(), false);

// 세 번째 행 설정
        XWPFTableRow rowThree = table.createRow();
        setCellText(rowThree.getCell(0), "귀책", true);
        setCellText(rowThree.getCell(1), progress.getResultStatus().equals(ResultStatus.Normal)?"정상":progress.getResultStatus().equals(ResultStatus.SdiFault)?"배터리 불량":"고객 귀책", false);

// 네 번째 행 설정
        XWPFTableRow rowFour = table.createRow();
        setCellText(rowFour.getCell(0), "세부 사항", true);
        // 병합하기 위해 빈 셀로 남겨두기

        // 다섯 번째 행 설정
        XWPFTableRow rowFive = table.createRow();
        XWPFTableCell cellFive = rowFive.getCell(0);

        rowFive.setHeight(7000);

        String extendedContent = null;
        // 셀에 내용 설정
        if(progress.getResponseReason().equals("전압 이상")){
            extendedContent = "전압에 대해 비정상적인 수치가 감지되었습니다. 확인 후 교체가 필요합니다.";
        }else if(progress.getResponseReason().equals("전류 이상")){
            extendedContent = "전압에 대해 비정상적인 수치가 감지되었습니다. 확인 후 교체가 필요합니다.";
        }else if(progress.getResponseReason().equals("온도 이상")){
            extendedContent = "전압에 대해 비정상적인 수치가 감지되었습니다. 확인 후 교체가 필요합니다.";
        }else if(progress.getResponseReason().equals("복합 이상")){
            extendedContent = "전반적으로 비정상적인 수치가 감지되었습니다. 확인 후 교체가 필요합니다.";
        }else if(progress.getResponseReason().equals("연결 이상")){
            extendedContent = "연결 상태가 불량한 것으로 판단되는 데이터가 감지되었습니다. 배터리 연결 또는 보관 상태 확인을 요망합니다.";
        }else if(progress.getResponseReason().equals("배터리 노화")){
            extendedContent = "배터리의 노화로 인한 이상으로 판단됩니다. 배터리 교체가 필요합니다.";
        }else if(progress.getResponseReason().equals("정상")){
            extendedContent = "데이터에 이상이 감지되지 않았습니다. 배터리 연결 또는 보관 상태 확인을 요망합니다.";
        }else{
            extendedContent = progress.getResponseReason();
        }

        cellFive.setText(extendedContent);


        // 셀 병합
        mergeCellHorizontally(table, 2, 1, 3);
        mergeCellHorizontally(table, 3, 0, 3);
        mergeCellHorizontally(table, 4, 0, 3);
        //rowFive.setHeight((short)600);
//        try (FileOutputStream out = new FileOutputStream(filePath)) {
//            document.write(out);
//            out.close();
//        }
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            document.write(byteArrayOutputStream);
            byte[] output = byteArrayOutputStream.toByteArray();
            byteArrayOutputStream.close();
            return output;
        }
        finally {
            document.close();
        }
    }

    // 가로 셀 병합을 위한 메소드
    private void mergeCellHorizontally(XWPFTable table, int row, int fromCell, int toCell) {
        for (int cellIndex = fromCell; cellIndex <= toCell; cellIndex++) {
            XWPFTableCell cell = table.getRow(row).getCell(cellIndex);
            if (cellIndex == fromCell) {
                // 첫 번째 셀이 병합의 시작점이 되므로, 나머지 셀들을 여기에 병합
                cell.getCTTc().addNewTcPr().addNewHMerge().setVal(STMerge.RESTART);
            } else {
                // 병합되는 셀들은 continue로 설정
                cell.getCTTc().addNewTcPr().addNewHMerge().setVal(STMerge.CONTINUE);
            }
        }
    }

    // 셀에 텍스트를 추가하고 가운데 정렬 및 볼드체 적용을 위한 메소드
    private void setCellText(XWPFTableCell cell, String text, boolean isBold) {
        XWPFParagraph paragraph = cell.getParagraphs().get(0); // 기존 단락을 사용
        if (paragraph == null) {
            paragraph = cell.addParagraph();
        }
        paragraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun run = paragraph.createRun();
        run.setText(text);
        run.setBold(isBold);
    }

    private void addImageWatermark(XWPFDocument document, byte[] imgPath) throws IOException, InvalidFormatException {
        byte[] imageBytes = imgPath;
//        try (FileInputStream fis = new FileInputStream(imgPath)) {
//            imageBytes = IOUtils.toByteArray(fis);
//        }

        XWPFHeaderFooterPolicy policy = new XWPFHeaderFooterPolicy(document);
        XWPFHeader header = policy.createHeader(XWPFHeaderFooterPolicy.DEFAULT);

        XWPFParagraph headerPara = header.createParagraph();
        headerPara.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun run = headerPara.createRun();

        // 이미지를 페이지에 맞게 크게 조절
        int width = Units.toEMU(300); // 예시: 페이지 너비에 맞게 조절
        int height = Units.toEMU(50); // 예시: 페이지 높이에 맞게 조절
        run.addPicture(new ByteArrayInputStream(imageBytes), XWPFDocument.PICTURE_TYPE_PNG, "img.png", width, height);
    }

}


