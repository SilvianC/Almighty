import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { changeStatus, postHistory } from "../../api/battery";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import http from "../../api/http";
import CloseIcon from "../../assets/images/icon-close.png";

const RegistResult = ({ progress, setProgress, isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("사유 선택");
  const [result, setResult] = useState(null);
  const [resonDetail, setReasonDetail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(() => "사유 선택");
    setResult(() => null);
    setReasonDetail(() => "");
    setIsDropdownOpen(() => false);
  }, [progress]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleRegister = () => {
    const request = {
      progressId: progress,
      resultStatus: result,
      responseReason:
        selectedOption +
        (selectedOption === "기타" ? " 상세 사유 : " + resonDetail : ""),
    };
    http
      .put(`/api/batteries/progress/${progress}`, request, {
        responseType: "arraybuffer",
      })
      .then(({ data }) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `결과보고서_${progress}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.location.reload();
      })
      .catch();
  };

  const reason = (e) => {
    setReasonDetail(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <S.Wrap className="modal">
      <S.Title>
        <p>결과 등록</p>
        <img src={CloseIcon} alt="close" onClick={onClose} />
      </S.Title>
      <S.Option>
        <div>
          <label>
            <input
              type="radio"
              name="radio"
              checked={result === "SdiFault"}
              onChange={() => {
                setResult(() => "SdiFault");
              }}
            />
            <span>SDI 귀책</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              checked={result === "CustomerFault"}
              onChange={() => {
                setResult(() => "CustomerFault");
              }}
            />
            <span>고객 귀책</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              checked={result === "Normal"}
              onChange={() => {
                setResult(() => "Normal");
              }}
            />
            <span>정상</span>
          </label>
        </div>
      </S.Option>
      <S.Reason>
        <p>| 사유 |</p>
        <S.Dropdown>
          <button onClick={toggleDropdown}>{selectedOption}</button>
          {isDropdownOpen && (
            <div className="content">
              <span
                onClick={(e) => {
                  setSelectedOption(e.target.textContent);
                  toggleDropdown();
                }}
              >
                counter error
              </span>
              <span
                onClick={(e) => {
                  setSelectedOption(e.target.textContent);
                  toggleDropdown();
                }}
              >
                communication error
              </span>
              <span
                onClick={(e) => {
                  setSelectedOption(e.target.textContent);
                  toggleDropdown();
                }}
              >
                기타
              </span>
            </div>
          )}
        </S.Dropdown>
        {selectedOption == "기타" && (
          <input type="text" placeholder="상세 사유 입력" />
        )}
      </S.Reason>
      <S.Regist>
        {!result || selectedOption === "사유 선택" || progress == null ? (
          <button style={{ "background-color": "#D5DFE9" }} disabled>
            등록
          </button>
        ) : (
          <button
            onClick={() => {
              handleRegister();
            }}
          >
            등록
          </button>
        )}
      </S.Regist>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    position: fixed;
    left: auto;
    right: 20px;
    top: auto;
    bottom: 110px;
    width: 40%;
    height: 300px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #f2f2f2;
    // border: medium solid #A7BCD0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
    animation: slideInUp 0.5s ease;

    @keyframes slideInUp {
      from {
        transform: translateY(40%);
      }
      to {
        transform: translateY(0);
      }
    }
  `,
  Title: styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;

    > p {
      height: 100%;
      border-radius: 10px;
      color: #034f9e;
      font-weight: bold;
      font-size: 25px;
      padding-left: 0.7rem;
      padding-right: 0.7rem;
    }
    > img {
      width: 30px;
      height: 30px;
      margin-bottom: 10px;
      margin-left: auto;
      cursor: pointer;
    }
  `,
  Option: styled.div`
    width: 100%;

    > div {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.5rem;
      justify-content: center;
      width: 100%;
    }
    > div > label {
      width: 33.33%;
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
    }
    > div > label > span {
      display: block;
      cursor: pointer;
      background-color: #f2f2f2;
      padding: 0.375em 0.75em;
      position: relative;
      margin-left: 0.0625em;
      border: 4px solid #e7ecf2;
      letter-spacing: 0.05em;
      color: #b6c0c9;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      transition: background-color 0.5s ease;
    }
    > div > label:first-child > span {
      border-radius: 0.375em 0 0 0.375em;
    }
    > div > label:last-child > span {
      border-radius: 0 0.375em 0.375em 0;
    }
  `,
  Reason: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    > p {
      font-size: 18px;
      font-weight: bold;
      color: #1d1f25;
      width: 30%;
      text-align: center;
      margin-bottom: 0rem;
    }
    > input {
      width: 70%;
      background-color: #f2f2f2;
      font-size: 18px;
      font-weight: bold;
      color: #1d1f25;
      border: 4px solid #e7ecf2;
      border-radius: 0.375em;
      padding: 0.375em 0.75em;
      text-align: center;
    }
  `,
  Dropdown: styled.div`
    position: relative;
    display: inline-block;
    width: 70%;

    &.open .content {
      display: block;
    }
    &:hover {
      .content {
        display: block;
      }
    }
    > button {
      background-color: #f2f2f2;
      font-size: 18px;
      font-weight: bold;
      color: #1d1f25;
      border: 4px solid #e7ecf2;
      border-radius: 0.375em;
      width: 100%;
      padding: 0.375em 0.75em;
    }
    > .content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      width: 100%;
      z-index: 1;
    }
    > .content > span {
      color: #1d1f25;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
  `,
  Regist: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    > button {
      background-color: #034f9e;
      border: none;
      border-radius: 0.375em;
      width: 20%;
      height: 3rem;
      color: #f2f2f2;
      font-weight: bold;
      font-size: 20px;
    }
  `,
};

export default RegistResult;
