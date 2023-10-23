import styled from "styled-components";
import * as components from "../../../components"

const SignUpForm = () => {
  return (
    <S.Wrap>
      <components.Signup></components.Signup>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 100%;
    padding-top: 5%;
  `,
};

export default SignUpForm;
