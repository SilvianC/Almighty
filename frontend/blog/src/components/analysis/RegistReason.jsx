import React from "react";
import styled from "styled-components";

const RegistReason = () => {

	return (
		<S.Wrap>
			<S.Title>
				<p>신청 사유</p>
			</S.Title>
			<S.Reason>
				<span>발열 이슈 발생 등 고객이 작성한 신청 사유 표시</span>
				<p>(2023.11.08)</p>
			</S.Reason>
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
    width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
	`,
	Title: styled.div`
		> p {
			color: #1D1F25;
			font-size: 18px;
			margin: 0px;
		}
	`,
	Reason: styled.div`
		background-color: #F2F2F2;
		width: 85%;
		height: 100px;
		border-radius: 10px;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197), 0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);

		> span {
			margin-left: 20px;
			margin-bottom: 5px;
			color: #82858B;
			font-size: 18px;
			font-weight: bold;
		}
		> p {
			margin-left: 20px;
			margin-bottom: 0px;
			color: #B9B9B9;
			font-size: 17px;
		}
	`,
};

export default RegistReason;