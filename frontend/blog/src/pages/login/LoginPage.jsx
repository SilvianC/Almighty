import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/member";

const LoginPage = () => {
  const requestLogin = () => {
    login(
      { loginId, password },
      ({ data }) => {
        console.log(data);
        navigate("/main");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    loginId: "",
    password: "",
  });
  const gotoSignUpForm = () => {
    navigate("/signup");
  };
  const { loginId, password } = inputs;

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setinputs({
      ...inputs,
      [id]: value,
    });
  };
  return (
    <div>
      <div>
        <input
          type="text"
          id="loginId"
          value={loginId}
          placeholder="아이디"
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="비밀번호"
          onChange={onChange}
        />
      </div>
      <div id="login_keep_wrap">
        <span class="keep_check">
          <input
            type="checkbox"
            id="keep"
            name="nvlong"
            class="input_keep"
            value="off"
          />
          <label for="keep" class="keep_text">
            로그인 상태 유지
          </label>
        </span>

        <span class="switch">
          <input
            type="checkbox"
            id="switch"
            class="switch_checkbox"
            value="off"
          />
          <label for="switch" class="switch_btn">
            <span class="blind" id="switch_blind">
              on
            </span>
          </label>
        </span>

        <div>
          <button type="submit" onClick={requestLogin}>
            로그인
          </button>
          <button type="button" onClick={gotoSignUpForm}>
            회원 가입
          </button>
        </div>
      </div>
    </div>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      ${({ theme }) => theme.color.background2} 28%,
      ${({ theme }) => theme.color.background} 28%
    );

    text-align: center;
    padding-top: 100px;
    align-items: center;
  `,
  Logo: styled.div`
    height: 160px;
    margin: 30px auto;
  `,
  ThinkerImage: styled.div`
    align-self: center;
    width: 260px;
    margin: 12em auto;
    img {
      width: 100%;
      height: auto;
    }
  `,
};

export default LoginPage;
