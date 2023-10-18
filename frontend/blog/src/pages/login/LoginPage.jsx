import styled from "styled-components";
import * as components from "../../components";

const LoginPage = () => {
  return (
    <S.Wrap>
      <components.Login></components.Login>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 100%;
    padding-top: 10%;
  `,
};

export default LoginPage;
