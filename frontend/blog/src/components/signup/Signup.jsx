import React, { useState } from "react";
import styled from "styled-components";
import { checkDuplication, joinMember } from "../../api/member";
import { useNavigate } from "react-router-dom";
import JoinInIcon from "../../assets/images/icon-joinIn.png"
import FirebaseComponent from "../../config/firebase-messaging-sw";

const SignUp = () => {
  const navigate = useNavigate();
  FirebaseComponent();
  const postMember = () => {
    if (!checkDupDone) {
      alert("아이디 중복 확인을 해주세요");
    }
    else if (!equalPw) {
      alert("비밀번호를 확인해주세요");
    }
    else if (checkDupDone === true && usableId === true) {
      joinMember(
        {
          company,
          loginId,
          password,
          email,
          tel,
        },
        ({ data }) => {
          console.log(data);
          navigate("/");
        },
        ({ error }) => {
          console.log(error);
        }
      );
    }
  };

  const [checkDupDone, setCheckDupDone] = useState(false);
  const [usableId, setUsableId] = useState(false);
  const checkDup = () => {
    if (!loginId) {
      alert("아이디를 입력해주세요");
    }
    checkDuplication(
      loginId,
      ({ data }) => {
        console.log(data);
        setCheckDupDone(true);
        if (data === "이미 사용 중인 loginId 입니다.") {
          setUsableId(false);
        }
        else if (data === "사용 가능한 loginId 입니다.") {
          setUsableId(true)
        }
      },
      ({ error }) => {
        console.log(error);
      }
    )

  }

  const idChange = () => {
    setCheckDupDone(false);
  }

  const [equalPw, setEqualPw] = useState(false);
  const pwChange = (e) => {
    const value = e.target.value;
    if (password && value && password === value) {
      setEqualPw(true);
    } else {
      setEqualPw(false);
    }
  }

  const [inputs, setinputs] = useState({
    company: "",
    loginId: "",
    password: "",
    password_check: "",
    email: "",
    tel: "",
    selectedValue: "82",
  });

  const { email, tel, loginId, password, password_check, company, selectedValue } = inputs;

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setinputs({
      ...inputs,
      [id]: value,
    });
  };

  return (
    <S.Wrap>
      <S.Container>
        <S.Title>
          <S.Icon>
            <img src={JoinInIcon} alt="icon" />
          </S.Icon>
          <p>계정 생성</p>
        </S.Title>
        <S.Inputs>
          <S.InputId>
            <input
              type="text"
              id="loginId"
              value={loginId}
              placeholder="아이디"
              onChange={(e) => {
                onChange(e);
                idChange();
              }}
            />
            <button onClick={checkDup}>중복확인</button>
          </S.InputId>
          {checkDupDone && !usableId
            ? (<p>이미 사용 중인 아이디 입니다</p>)
            : null}
          {checkDupDone && usableId
            ? (<p>사용 가능한 아이디 입니다</p>)
            : null}
          <input
            type="text"
            id="company"
            value={company}
            placeholder="회사명"
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="비밀번호"
            onChange={onChange}
          />
          <input
            type="password"
            id="password_check"
            value={password_check}
            placeholder="비밀번호 확인"
            onChange={(e) => {
              onChange(e);
              pwChange(e);
            }}
          />
          {password && password_check && !equalPw
            ? (<p>비밀번호를 확인해주세요</p>)
            : null}
          {password && password_check && equalPw
            ? (<p>비밀번호가 일치합니다</p>)
            : null}
          <input
            type="email"
            id="email"
            value={email}
            placeholder="이메일"
            onChange={onChange}
          />
          
          <input
            type="tel"
            id="tel"
            placeholder="연락처"
            className="input"
            value={tel}
            onChange={onChange}
          />
        </S.Inputs>
        <button type="button" onClick={postMember} className="joinIn">
           계정 생성
        </button>
      </S.Container>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Container: styled.div`
    width: 46.875%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .joinIn {
      background-color: #1428A0;
      width: 70%;
      
      padding: 2%;
      margin-top: 5%;
      border: none;
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: #4F84C9;
      }
    }
  `,
  Title: styled.div`
    width: 100%;
    height: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    > p {
      color: #034F9E;
      font-size: 1rem;
      font-weight: bold;
    	margin-left: 3%;
    }
  `,
  Icon: styled.div`
    width: 3vw;
    min-width: 30px;
    height: 3vw;
    min-height: 30px;
    background: #1428A0;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      width: 80%;
      height: 80%;
      object-fit: cover;
    }
  `,
  Inputs: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > input {
      background-color: #F2F2F2;
      width: 100%;
      height: 5vh;
      margin: 1%;
      padding: 2%;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: bold;
      color: #034F9E;
      text-align: left;
      letter-spacing: 3px;
      cursor: pointer;
      &:hover {
        outline: none;
      }
      &:focus {
        outline: none;
      }
    }

    > p {
      font-size: 15px;
      font-weight: bold;
      color: #034F9E;
      margin: 1px;
      text-align: left;
      width: 100%;
    }

    > .selectBox {
      flex-direction: row;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 106%;
    }
    > .selectBox select {
      background-color: #F2F2F2;
      width: 104%;
      height: 6.5vh;
      margin: 1%;
      padding: 2%;
      color: #034F9E;
      border-radius: 10px;
      border: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-size: 0.5rem;
      font-weight: bold;
      cursor: pointer;
    }
    > .selectBox select:hover {
      background-color: #fbf7ef;
    }
    > .selectBox option {
      background-color: #ffffff;
      color: #888888;
      font-size: 12px;
    }
  `,
  InputId: styled.div`
    width: 104%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > input {
      background-color: #F2F2F2;
      width: 65%;
      height: 5vh;
      margin-left:9px;
      
      padding: 2%;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: bold;
      color: #034F9E;
      text-align: left;
      letter-spacing: 3px;
      cursor: pointer;
      &:hover {
        outline: none;
      }
      &:focus {
        outline: none;
      }
    }
    > button {
      background-color: #1428A0;
      width: 29%;
      height: 6vh;
      margin: 1%;
      padding: 2%;
      border: none;
      border-radius: 10px;
      color: #ffffff;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: #034F9E;
      }
    }
  `,
};

export default SignUp;