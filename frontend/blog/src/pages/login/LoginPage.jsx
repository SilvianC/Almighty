import styled from 'styled-components';
import * as components from '../../components';

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

    /* 모바일 환경에서만 적용될 스타일 */
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;  // 뷰포트의 높이로 설정
      padding-top: 0;  // 기존의 패딩 제거
    }
  `,
};

export default LoginPage;
