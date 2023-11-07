import React from "react";
import styled from "styled-components";

const RegistReason = () => {

	return (
		<S.Wrap>
			<S.Title>
					<p>| 신청 사유 |</p>
				</S.Title>
				<S.Reason>
					<span>발열 이슈 발생 등 고객이 작성한 신청 사유 표시</span>
				</S.Reason>
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
    width: 100%;
    padding: 6% 7.2% 6%;
		display: flex;
		flex-direction: row;
		align-items: center;
	`,
	Title: styled.div`
		> p {
			color: #034F9E;
			font-weight: bold;
			font-size: 30px;
		}
	`,
	Reason: styled.div`
		> span {
			margin-left: 20px;
			color: #1D1F25;
			font-size: 20px;
		}
	`,
};

export default RegistReason;