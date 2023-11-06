import React from "react";
import styled from "styled-components";

const BMSdata = () => {

	return (
		<S.Wrap>
			<S.Container>
				<S.Title>
					<p>충전</p>
				</S.Title>
				<S.Data>
					<span>총 시간: 2시간19분</span>
					<span>총 용량: 5000mAh</span>
				</S.Data>
				<S.Data>
					<div className="info">| 전압 |</div>
					<span>최대: 3.9755V</span>
					<span>최소: 2.6125V</span>
				</S.Data>
				<S.Data>
					<div className="info">| 온도 |</div>
					<span>최대: 37.3095℃</span>
					<span>최소: 24.3890℃</span>
				</S.Data>
			</S.Container>
			<S.Container>
				<S.Title lastTitle={true}>
					<p>방전</p>
				</S.Title>
				<S.Data>
					<span>총 시간: 2시간19분</span>
					<span>총 용량: 5000mAh</span>
				</S.Data>
				<S.Data>
					<div className="info">| 전압 |</div>
					<span>최대: 3.9755V</span>
					<span>최소: 2.6125V</span>
				</S.Data>
				<S.Data>
					<div className="info">| 온도 |</div>
					<span>최대: 37.3095℃</span>
					<span>최소: 24.3890℃</span>
				</S.Data>
			</S.Container>
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
    width: 100%;
    background-color: #F2F2F2;
    padding: 6% 7.2% 6%;
    border-radius: 10px;
		`,
	Container: styled.div`
		width: 100%;
    display: flex;
		flex-direction: column;
    align-items: center;
    justify-content: center;
	`,
	Title: styled.div`
    width: 85.6%;
    height: 40px;
    background-color: #E7ECF2;
    border-radius: 10px;
    > p {
			color: #034F9E;
			font-weight: bold;
			font-size: 25px;
			line-height: 40px;
			margin-left: 30px;
		}
		${(props) => props.lastTitle && "margin-top: 20px;"}
		`,
	Data: styled.div`
		width: 85.6%;
    display: flex;
		flex-direction: row;
		> span {
			margin: 0.5%;
			width: 50%;
			font-size: 20px;
			color: #1D1F25;
		}
		> div {
			width: 15%;
			margin: 0.5%;
			font-size: 20px;
			font-weight: bold;
			color: #1D1F25;
		}
  `,
};

export default BMSdata;