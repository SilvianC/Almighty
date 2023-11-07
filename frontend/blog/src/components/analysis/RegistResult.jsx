import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { changeStatus, postHistory } from "../../api/battery";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import http from "../../api/http";

const RegistResult = ({ progressId }) => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("사유 선택");
  const [result, setResult] = useState(null);
  const [resonDetail, setReasonDetail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleRegister = () => {
    const request = {
      progressId: progressId,
      toStatus: result,
      responseReason:
        selectedOption +
        (selectedOption === "기타" ? " 상세 사유 : " + resonDetail : ""),
    };
    http.put(`/api/batteries/progress/${progressId}`, request).then().catch();
  };

  /*
	const regist = () => {
		changeStatus(
			{ batteryId },
			{ status },
			(data) => {
				if (data.message === "상태 변경 완료") {
					// alert("결과 등록이 완료 되었습니다.");
				}
			},
			(error) => {
				console.log(error);
				// alert("다시 시도해주세요");
			}
		);
		postHistory(
			{ batteryId, fromStatus, toStatus, requestReason },
			(data) => {
				if (data.message === "히스토리 등록 완료") {
					// alert("결과 등록이 완료 되었습니다.");
				}
			},
			(error) => {
				console.log(error);
			}
		);
		alert("결과 등록이 완료 되었습니다.");
		navigate("/main");
	}
	*/

  return (
    <S.Wrap>
      <S.Title>
        <p>결과 등록</p>
      </S.Title>
      <S.Option>
        <div>
          <label>
            <input
              type="radio"
              name="radio"
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
        {!result || selectedOption === "사유 선택" ? (
          <button disabled>등록</button>
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
    width: 100%;
    background-color: #f2f2f2;
    padding: 6% 7.2% 6%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Title: styled.div`
    width: 85.6%;
    height: 40px;
    background-color: #e7ecf2;
    border-radius: 10px;
    > p {
      color: #034f9e;
      font-weight: bold;
      font-size: 25px;
      line-height: 40px;
      margin-left: 30px;
    }
  `,
  Option: styled.div`
    width: 85.6%;

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
    width: 85.6%;

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
    width: 85.6%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    > button {
      background-color: #034f9e;
      border: none;
      border-radius: 0.375em;
      width: 33.33%;
      height: 3rem;
      color: #f2f2f2;
      font-weight: bold;
      font-size: 20px;
    }
  `,
};

export default RegistResult;
