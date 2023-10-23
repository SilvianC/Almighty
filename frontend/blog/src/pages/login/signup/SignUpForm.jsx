import styled from "styled-components";
import * as components from "../../../components"
import FirebaseComponent from "../../../config/firebaseConfig";

const SignUpForm = () => {
  FirebaseComponent();
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
