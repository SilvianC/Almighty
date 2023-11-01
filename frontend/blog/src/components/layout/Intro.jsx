import React from "react";
import styled from "styled-components";
import battery from "../../assets/images/battery.png";
import building from "../../assets/images/building.png";
import chart from "../../assets/images/chart.png";

function Intro() {
  return (
    <div>
      <BuildingImg src={building}></BuildingImg>
      <Container>
        <Row>
          <Column>
            <div>초격차 기술력을 통해 지속가능한 친환경 미래 사회 구현</div>
          </Column>
          <Column>
            <div>
              To make the world greener and sustainable through out innovative
              technology
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <div>
              <BuildingImg src={battery}></BuildingImg>
            </div>
          </Column>
          <Column>
            <div>
              증가한 양극제 니켈 비율과 독자 소재를 적용한 음극제 사용으로
              높아진 배터리 성능
            </div>
          </Column>
        </Row>
        <div></div>
      </Container>
      <div>
        실시간 모니터링과 인공지능을 활용한 데이터 분석으로 빠른 반송 시스템
        제공
      </div>
      <ChartImg src={chart}></ChartImg>
    </div>
  );
}

export default Intro;

const BuildingImg = styled.img`
  width: 100%;
  height: auto;
`;

const ChartImg = styled.img`
  width: 100%;
  height: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px; /* Negative margin to offset column padding */
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const IntroPart = styled.div``;
