import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AnalysisResult = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

	return (
		<S.Wrap>
			<S.Title>
				<p>분석 결과</p>
			</S.Title>
			<S.Result>
			{isLoading && <div className="loader"></div>}
			{!isLoading && <p>분석 결과 출력</p>}
			</S.Result>
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
    width: 100%;
    background-color: #F2F2F2;
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
    background-color: #E7ECF2;
    border-radius: 10px;
    > p {
			color: #034F9E;
			font-weight: bold;
			font-size: 25px;
			line-height: 40px;
			margin-left: 30px;
		}
	`,
	Result: styled.div`
		width: 85.6%;
		> p {
			margin: 0.5%;
			font-size: 20px;
			color: #1D1F25;
		}
		> .loader {
			// display: none;
			margin: 5% auto;
			height: 100px;
			width: 100px;
			border: 6px solid #fff;
			border-right-color: #034F9E;
			border-top-color: #034F9E;
			border-radius: 100%;
			-webkit-animation: spin 800ms infinite linear;
			animation: spin 800ms infinite linear;
		}
		@-webkit-keyframes "spin" {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(359deg);
			}
		}
		
		@keyframes "spin" {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(359deg);
			}
		}
	`,
};

export default AnalysisResult;