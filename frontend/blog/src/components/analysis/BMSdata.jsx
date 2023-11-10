import React, { useState } from "react";
import styled from "styled-components";
import BMSIcon from "../../assets/images/icon-BMSdata.png";

const BMSdata = () => {
	const [isCharge, setIsCharge] = useState("충전");

	return (
		<S.Wrap>
			<S.Header>
				<img src={BMSIcon} alt="icon" />
				<span>주요 데이터</span>
				<p>{isCharge}</p>
			</S.Header>
			<S.Data>
				<S.Container>
					<S.ContainerTitle>총 시간 / 총 용량</S.ContainerTitle>
					<S.ContainerData>
						<span>2시간 19분</span>
						<span>1000AH</span>
					</S.ContainerData>
				</S.Container>
				<S.Container>
					<S.ContainerTitle>최대 전압</S.ContainerTitle>
					<S.ContainerData>
						<span>3.9755V</span>
					</S.ContainerData>
				</S.Container>
				<S.Container>
					<S.ContainerTitle>최소 전압</S.ContainerTitle>
					<S.ContainerData>
						<span>2.6125V</span>
					</S.ContainerData>
				</S.Container>
				<S.Container>
					<S.ContainerTitle>최대 온도</S.ContainerTitle>
					<S.ContainerData>
						<span>37.3095℃</span>
					</S.ContainerData>
				</S.Container>
				<S.Container>
					<S.ContainerTitle>최저 온도</S.ContainerTitle>
					<S.ContainerData>
						<span>24.3890℃</span>
					</S.ContainerData>
				</S.Container>
			</S.Data>
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
    width: 100%;
	`,
	Header: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;

		> span {
			color: #1D1F25;
			font-weight: bold;
			font-size: 18px;
			margin-left: 10px;
		}
		> p {
			color: #034F9E;
			margin-bottom: 0px;
			margin-left: 20px;
			font-weight: bold;
			font-size: 20px;
		}
	`,
	Data: styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	`,
	Container: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197), 0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);
		width: 16%;
		height: 200px;
	`,
	ContainerTitle: styled.div`
		color: #82858B;
		font-size: 15px;
		margin-left: 20px;
		margin-top: 15px;
	`,
	ContainerData: styled.div`
		color: #1D1F25;
		font-size: 20px;
		margin-left: 20px;
		margin-top: 25px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	`,
};

export default BMSdata;