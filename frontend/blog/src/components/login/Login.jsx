import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/member";
import LoginIcon from "../../assets/images/icon-login.png";

const Login = () => {
	const navigate = useNavigate();

	const [inputs, setinputs] = useState({
		loginId: "",
		password: "",
	});

	const { loginId, password } = inputs;

	const onChange = (e) => {
		const value = e.target.value;
		const id = e.target.id;

		setinputs({
			...inputs,
			[id]: value,
		});
	};

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

	const gotoSignUpForm = () => {
		navigate("/signup");
	};


	return (
		<S.Wrap>
			<S.Container>
				<S.Title>
					<S.Icon>
						<img src={LoginIcon} alt="icon" />
					</S.Icon>
					<p>로그인</p>
				</S.Title>
				<S.Login>
					<input
						type="text"
						id="loginId"
						value={loginId}
						placeholder="아이디"
						onChange={onChange}
					/>
					<input
						type="password"
						id="password"
						value={password}
						placeholder="비밀번호"
						onChange={onChange}
					/>
					<div className="option">
						<div>
							<input
								type="checkbox"
								id="keep"
								value="off"
							/>
							<label for="keep">
								아이디 저장
							</label>
						</div>
						<button type="button" onClick={gotoSignUpForm}>
							회원 가입
						</button>
					</div>
					<button type="submit" onClick={requestLogin}>
						로그인
					</button>
				</S.Login>
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
    height: 55.556%;
    border-radius: 10px;
    border: 3px solid #F2F2F2;
    padding: 2%;
    display: flex;
    flex-direction: column;
  `,
	Title: styled.div`
    width: 100%;
    height: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    > p {
      color: #1428A0;
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
	Login: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > input {
    background-color: #F2F2F2;
    width: 55.55%;
    height: 5vh;
    margin: 1%;
    padding: 2%;
    border: none;
    border-radius: 10px;
    font-size: 0.5rem;
    font-weight: bold;
    color: #888888;
    text-align: left;
    cursor: pointer;
    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
    }

    >.option {
      width: 58%;
      height: 5%;
      margin-top: 1%;
      margin-bottom: 10%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .option div {
      display: flex;
      align-items: center;
    }
    > .option div label {
      font-size: 0.3rem;
      font-weight: bold;
      color: #888888;
    }
    > .option button {
      background-color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 0.3rem;
      font-weight: bold;
      color: #1428A0;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        background-color: #F2F2F2;
      }
    }

    > button {
      background-color: #1428A0;
      width: 55.55%;
      padding: 2%;
      border: none;
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.5rme;
      font-weight: bold;
    }
  `,
};

export default Login;