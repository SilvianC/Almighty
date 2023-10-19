import React from "react";
import styled from "styled-components";
import BatteryBoard from "./BatteryBoard";

const Board = () => {
  return (
    <S.Container>
      <BatteryBoard></BatteryBoard>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
  `
};


export default Board;
