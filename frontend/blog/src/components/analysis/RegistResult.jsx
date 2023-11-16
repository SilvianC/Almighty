import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ColorRing } from "react-loader-spinner";
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
  const [isLoading, setIsLoading] = useState(false);
  const [dropdown, setdropdown] = useState([]);
  const sdiList = ["전압 이상", "전류 이상", "온도 이상", "복합 이상", "기타"];
  const customerList = ["연결 이상", "배터리 노화", "기타"];
  const normalList = ["정상"];

  useEffect(() => {
    setSelectedOption(() => "사유 선택");
    setResult(() => null);
    setReasonDetail(() => "");
    setIsDropdownOpen(() => false);
  }, [progress]);

  useEffect(() => {
    if (result === null) {
      setdropdown(() => []);
      setSelectedOption(() => "사유 선택");
    } else if (result === "SdiFault") {
      setdropdown(() => [...sdiList]);
      setSelectedOption(() => "사유 선택");
    } else if (result === "CustomerFault") {
      setdropdown(() => [...customerList]);
      setSelectedOption(() => "사유 선택");
    } else if (result === "Normal") {
      setdropdown(() => [...normalList]);
      setSelectedOption(() => "정상");
    }
  }, [result]);

  const toggleDropdown = () => {
    console.log(dropdown);
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleRegister = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const reason = (e) => {
    setReasonDetail(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <S.Wrap className="modal" style={{ overflow: "visible" }}>
      {isLoading && (
        <S.LoadingContainer>
          <ColorRing
            visible={true}
            height="150"
            width="150"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
          />
        </S.LoadingContainer>
      )}
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
              {dropdown.map((item) => {
                return (
                  <span
                    onClick={(e) => {
                      setSelectedOption(e.target.textContent);
                      toggleDropdown();
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          )}
        </S.Dropdown>
        {selectedOption == "기타" && (
          <input type="text" placeholder="상세 사유 입력" />
        )}
      </S.Reason>
      <S.Regist>
        {!result ||
        selectedOption === "사유 선택" ||
        progress == null ||
        isLoading ? (
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
  LoadingContainer: styled.div`
    position: absolute; // 상대 위치 설정
    display: flex;
    border-radius: 10px;
    flex-direction: column; // 아이템을 수직으로 정렬
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
    z-index: 4;
  `,
};

export default RegistResult;
