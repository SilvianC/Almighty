import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import BMSIcon from "../../assets/images/icon-BMSdata.png";
import TimeIcon from "../../assets/images/icon-Time.png";
import CapacityIcon from "../../assets/images/icon-capacity.png";
import VoltageIcon from "../../assets/images/icon-voltage.png";
import TemperIcon from "../../assets/images/icon-temperature.png";

const BMSdata = ({ data, battery }) => {
  console.log(battery);

  const [isCharge, setIsCharge] = useState("충전");
  const [isDataExist, setIsDataExist] = useState(false);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);

  const handleChargeClick = () => {
    setIsCharge("충전");
  };

  const handleDischargeClick = () => {
    setIsCharge("방전");
  };

  const convertDecimalTime = (decimalTime) => {
    const h = Math.floor(decimalTime);
    const m = Math.floor((decimalTime - h) * 60);
    const s = Math.floor(((decimalTime - h) * 60 - m) * 60);
    setHour(() => h);
    setMinute(() => m);
    setSecond(() => s);
  };

  useEffect(() => {
    if (data != null) {
      setIsDataExist(() => true);
      convertDecimalTime(data.chargeTime);
      convertDecimalTime(data.chargeTime);
    } else {
      setIsDataExist(() => false);
    }
  }, [data]);

  useEffect(() => {
    if (data != null) {
      if (isCharge === "충전") {
        convertDecimalTime(data.chargeTime);
      } else {
        convertDecimalTime(data.dischargeTime);
      }
    }
  }, [isCharge]);

  return (
    <S.Wrap>
      <S.Header>
        <img src={BMSIcon} alt="icon" />
        <span>주요 데이터</span>
        <S.Option>
          <div>
            <label>
              <input
                type="radio"
                name="type"
                checked={isCharge === "충전"}
                onChange={() => {
                  setIsCharge(() => "충전");
                }}
              />
              <span>충전</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                checked={isCharge === "방전"}
                onChange={() => {
                  setIsCharge(() => "방전");
                }}
              />
              <span>방전</span>
            </label>
          </div>
        </S.Option>
      </S.Header>
      {isCharge === "충전" ? (
        <S.Data>
          <S.Container>
            <S.ContainerTitle>총 시간</S.ContainerTitle>
            <S.ContainerData>
              <span>
                {isDataExist && data !== null
                  ? `${hour}시 ${minute}분 ${second}초`
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={TimeIcon} alt="time" />
            </S.ContainerImg>
          </S.Container>
          <S.Container>
            <S.ContainerTitle>총 용량</S.ContainerTitle>
            <S.ContainerData>
              <span>{isDataExist && data !== null ? data.capacity + "mA" : "-"}</span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={CapacityIcon} alt="capacity" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null && data.maxVoltageCharge > battery.overVoltage
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            <S.ContainerTitle>최대 전압</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null && data.maxVoltageCharge > battery.overVoltage
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.maxVoltageCharge.toFixed(4) + "V"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={VoltageIcon} alt="voltage" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null && data.minVoltageCharge < battery.underVoltage
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            <S.ContainerTitle>최소 전압</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null && data.minVoltageCharge < battery.underVoltage
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.minVoltageCharge.toFixed(4) + "V"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={VoltageIcon} alt="voltage" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null &&
              data.maxTemperatureCharge > battery.chargingMaxTemperature
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            <S.ContainerTitle>최대 온도</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null &&
                data.maxTemperatureCharge > battery.chargingMaxTemperature
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.maxTemperatureCharge.toFixed(4) + "℃"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={TemperIcon} alt="temperature" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null &&
              data.minTemperatureCharge < battery.chargingMinTemperature
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            <S.ContainerTitle>최저 온도</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null &&
                data.minTemperatureCharge < battery.chargingMinTemperature
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.minTemperatureCharge.toFixed(4) + "℃"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={TemperIcon} alt="temperature" />
            </S.ContainerImg>
          </S.Container>
        </S.Data>
      ) : (
        <S.Data>
          <S.Container>
            <S.ContainerTitle>총 시간</S.ContainerTitle>
            <S.ContainerData>
              <span>
                {isDataExist && data !== null
                  ? `${hour}시 ${minute}분 ${second}초`
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={TimeIcon} alt="time" />
            </S.ContainerImg>
          </S.Container>
          <S.Container>
            <S.ContainerTitle>총 용량</S.ContainerTitle>
            <S.ContainerData>
              <span>{isDataExist && data !== null ? data.capacity + "mA" : "-"}</span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={CapacityIcon} alt="capacity" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null && data.maxVoltageDischarge > battery.overVoltage
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            {" "}
            <S.ContainerTitle>최대 전압</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null && data.maxVoltageDischarge > battery.overVoltage
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.maxVoltageDischarge.toFixed(4) + "V"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={VoltageIcon} alt="voltage" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null && data.minVoltageDischarge < battery.underVoltage
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            {" "}
            <S.ContainerTitle>최소 전압</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null && data.minVoltageDischarge < battery.underVoltage
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.minVoltageDischarge.toFixed(4) + "V"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={VoltageIcon} alt="voltage" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null &&
              data.maxTemperatureDischarge > battery.dischargingMaxTemperature
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            {" "}
            <S.ContainerTitle>최대 온도</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null &&
                data.maxTemperatureDischarge > battery.dischargingMaxTemperature
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.maxTemperatureDischarge.toFixed(4) + "℃"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={TemperIcon} alt="temperature" />
            </S.ContainerImg>
          </S.Container>
          <S.Container
            style={
              data != null &&
              data.minTemperatureDischarge < battery.dischargingMinTemperature
                ? { backgroundColor: "#FFE3E3" }
                : null
            }
          >
            {" "}
            <S.ContainerTitle>최저 온도</S.ContainerTitle>
            <S.ContainerData
              style={
                data != null &&
                data.minTemperatureDischarge < battery.dischargingMinTemperature
                  ? { color: "#D84848", fontWeight: "bold" }
                  : null
              }
            >
              <span>
                {isDataExist && data !== null
                  ? data.minTemperatureDischarge.toFixed(4) + "℃"
                  : "-"}
              </span>
            </S.ContainerData>
            <S.ContainerImg>
              <img src={TemperIcon} alt="temperature" />
            </S.ContainerImg>
          </S.Container>
        </S.Data>
      )}
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 98%;
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;

    > img {
      width: 35px;
      height: 35px;
    }
    > span {
      color: #034f9e;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 0px;
      margin-left: 10px;
      margin-right: 20px;
    }
  `,
  Option: styled.div`
    width: 200px;

    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    > div > label {
      width: 50%;
    }
    > div > label > input[type="radio"] {
      clip: rect(0 0 0 0);
      clip-path: inset(100%);
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
    }
    > div > label > input[type="radio"]:checked + span {
      background-color: #034f9e;
      z-index: 1;
      color: #f2f2f2;
      transition: all 0.3s ease;
    }
    > div > label > span {
      display: block;
      cursor: pointer;
      background-color: #f2f2f2;
      padding: 0.175em 0.65em;
      position: relative;
      margin-left: 0.0625em;
      border: 4px solid #e7ecf2;
      letter-spacing: 0.05em;
      color: #b6c0c9;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      transition: all 0.5s ease;
    }
    > div > label:first-child > span {
      border-radius: 0.375em 0 0 0.375em;
    }
    > div > label:last-child > span {
      border-radius: 0 0.375em 0.375em 0;
    }
  `,
  Data: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: all 1s ease;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
      0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
      0px 20px 80px rgba(0, 0, 0, 0.07);
    width: 16%;
    height: 100px;
    background-color: #e1ecfc;
    position: relative;
    transition: all 0.3s ease;
  `,
  ContainerImg: styled.div`
    > img {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
    }
  `,
  ContainerTitle: styled.div`
    color: #82858b;
    font-size: 15px;
    font-weight: bold;
    margin-left: 20px;
    height: 10%;
    z-index: 2;
  `,
  ContainerData: styled.div`
    color: #1d1f25;
    font-size: 25px;
    margin-left: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30%;
    position: relative;
    z-index: 2;
  `,
};

export default BMSdata;
