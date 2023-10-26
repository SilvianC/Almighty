import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BiCaretRight } from "react-icons/bi";
import { BsBatteryCharging } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import http from "../../api/http";

const ModelTable =({ modelId, isVisible})=>{
    const [modelData, setModelData] = useState(null);
    useEffect(() => {
        if (modelId) {
        http
          .get(`/api/model/${modelId}`)
          .then(({ data }) => {
            console.log(data)
            setModelData(data.data);
          })
          .catch();
        }
      },[modelId]);

    return (
        <S.Wrap>
        <S.Title className="d-flex align-items-center">
            <BsBatteryCharging />
            배터리 모델 정보
        </S.Title>
        {modelData && (
            <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>모델 이름</td>
                    <td>{modelData.modelName}</td>
                </tr>
                <tr>
                    <td>최대 전압</td>
                    <td>{modelData.overVoltage}V</td>
                </tr>
                <tr>
                    <td>최소 전압</td>
                    <td>{modelData.underVoltage}V</td>
                </tr>
                <tr>
                    <td>충전 최대 전류</td>
                    <td>{modelData.chargingOverCurrent}A</td>
                </tr>
                <tr>
                    <td>충전 최대 온도</td>
                    <td>{modelData.chargingMaxTemperature}°C</td>
                </tr>
                <tr>
                    <td>충전 최소 온도</td>
                    <td>{modelData.chargingMinTemperature}°C</td>
                </tr>
                <tr>
                    <td>방전 최대 전류</td>
                    <td>{modelData.dischargingOverCurrent}A</td>
                </tr>
                <tr>
                    <td>방전 최대 온도</td>
                    <td>{modelData.dischargingMaxTemperature}°C</td>
                </tr>
                <tr>
                    <td>방전 최소 온도</td>
                    <td>{modelData.dischargingMinTemperature}°C</td>
                </tr>
            </tbody>
        </Table>
        )}
    </S.Wrap>
    );
};

export default ModelTable;

const S = {
    Wrap: styled.div`
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    `,
    Title: styled.h2`
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        color: #333;
        display: flex;
        align-items: center;
        gap: 10px;
    `,
};
