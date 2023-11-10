import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/sdilogo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Nav, NavItem, NavLink, Dropdown } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  MemberIdState,
  LoginIdState,
  CompanyState,
  RoleState,
  EmailState,
  TelState,
  AccessTokenState,
  RefreshTokenState,
  IsLoginState,
} from "../../states/states";
import http from "../../api/http";
import AlarmModal from "../alarm/AlarmModal";
import { useState } from "react";
import { countAlarm } from "../../api/alarm";
function Header() {
  const modalRef = useRef < HTMLDivElement > null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(!isModalOpen);
  const modalOutSideClick = (e) => {
    console.log(e.target);
    if (modalRef.current === e.target) {
      setIsModalOpen(false);
    }
  };
  const [count, setCount] = useState(0);
  useEffect(() => {
    countAlarm(
      memberId,
      ({ data }) => {
        console.log(data);
        setCount(data.count);
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }, []);

  const navigate = useNavigate();
  const memberId = useRecoilValue(MemberIdState);
  const memberrolestate = useRecoilValue(RoleState);
  console.log(memberId);
  const requestAccessToken = useRecoilValue(AccessTokenState);
  console.log(requestAccessToken);
  const setMemberId = useSetRecoilState(MemberIdState);
  const setLoginId = useSetRecoilState(LoginIdState);
  const setCompany = useSetRecoilState(CompanyState);
  const setRole = useSetRecoilState(RoleState);
  const setEmail = useSetRecoilState(EmailState);
  const setTel = useSetRecoilState(TelState);
  const setAccessToken = useSetRecoilState(AccessTokenState);
  const setRefreshToken = useSetRecoilState(RefreshTokenState);
  const setLoginstate = useResetRecoilState(IsLoginState);
  async function handleLogout() {
    try {
      await http
        .post(
          "/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `${requestAccessToken}`,
            },
          }
        )
        .then(
          setMemberId(null),
          setLoginId(null),
          setCompany(null),
          setRole(null),
          setEmail(null),
          setTel(null),
          setAccessToken(null),
          setRefreshToken(null),
          setLoginstate(""),
          navigate("/")
        );
      // 로그아웃 후 처리할 로직이 있다면 이곳에 추가
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  }
  const [isOpen, setIsOpen] = React.useState(false); // 햄버거 메뉴 상태
  return (
    <S.TopNavBar>
      <S.CustomNav tabs="true">
        <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>

        {/* 모바일에서만 보이는 햄버거 메뉴 아이콘 */}
        {memberId && (
          <Dropdown>
            <Dropdown.Toggle as={S.MobileTab} id="dropdown-basic">
              <GiHamburgerMenu />
            </Dropdown.Toggle>

            <Dropdown.Menu as={S.HamburgerMenu}>
              <Dropdown.Item href="#" onClick={() => navigate("/mobilealarm")}>
                MobileAlarm
              </Dropdown.Item>
              {memberrolestate === "USER" && (
                <Dropdown.Item href="#" onClick={() => navigate("/return")}>
                  Return
                </Dropdown.Item>
              )}
              <Dropdown.Item href="#" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {/* 모바일에서만 보이는 탭
        {memberId &&<S.MobileTab>
          <S.CustomNavLink href="#" onClick={() => navigate("/mobilealarm")}>MobileAlarm</S.CustomNavLink>
        </S.MobileTab>} */}

        {/* PC에서만 보이는 탭들 */}
        {memberId && (
          <S.PCTabs>
            <NavItem>
              <S.CustomNavLink
                href="#"
                onClick={() => navigate("/service-history")}
              >
                Service History
              </S.CustomNavLink>
            </NavItem>
            <NavItem>
              <S.CustomNavLink
                href="#"
                onClick={() => navigate("/returnconfirm")}
              >
                Return Confirm
              </S.CustomNavLink>
            </NavItem>
            <NavItem>
              <S.CustomNavLink href="#" onClick={() => navigate("/return")}>
                Return
              </S.CustomNavLink>
            </NavItem>
            {/* <NavItem className="alarm">
              <S.Alarm
                className="alarmImage"
                src={isModalOpen ? "bluebell.png" : "whitebell.png"}
                onClick={openModal}
              ></S.Alarm>
              {count > 0 && (
                <S.AlarmCount>
                  {count > 99 ? (
                    <p
                      style={{
                        "font-size": "11px",
                        "padding-top": "3px",
                        "padding-left": "1px",
                      }}
                    >
                      99+
                    </p>
                  ) : (
                    <p>{count}</p>
                  )}
                </S.AlarmCount>
              )}

              <AlarmModal
                modalRef={modalRef}
                modalOutSideClick={modalOutSideClick}
                isOpen={isModalOpen}
                setCount={setCount}
                count={count}
                setModalOpen={setIsModalOpen}
              />
            </NavItem> */}
            {/* 오른쪽 구석에 위치한 로그아웃 탭 */}
            {memberId && (
              <S.LogoutTab>
                <S.CustomNavLink href="#" onClick={handleLogout}>
                  Logout
                </S.CustomNavLink>
              </S.LogoutTab>
            )}
          </S.PCTabs>
        )}

        {/* 오른쪽 구석에 위치한 로그아웃 탭
        {memberId &&<S.LogoutTab>
          <S.CustomNavLink href="#" onClick={handleLogout}>Logout</S.CustomNavLink>
        </S.LogoutTab>} */}
      </S.CustomNav>
    </S.TopNavBar>
  );
}

const S = {
  TopNavBar: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #d5dfe9;
    align-items: flex-start;
    padding-left: 20px;
    z-index: 1000;
    display: flex;
    justify-content: flex-start; // 여기를 변경합니다.
  `,

  Alarm: styled.img`
    width: 40px;
    height: 30px;
    margin-top: 10px;
    cursor: pointer;
  `,
  Logo: styled.img`
    width: 160px;
    height: 30px;
    margin-top: 12px;
    cursor: pointer;
  `,
  MobileTab: styled.div`
    display: none;
    margin-right: 5px;
    margin-left: 30px;
    padding: 17px 15px;
    color: #034f9e;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.5s;
    svg {
      // 햄버거 아이콘 크기 조절
      width: 24px;
      height: 24px;
    }
    &:hover {
      background-color: #ffffff;
      border-color: #adadad;
    }
    @media (max-width: 768px) {
      display: block;
    }
  `,
  PCTabs: styled.div`
    display: flex;
    @media (max-width: 768px) {
      display: none;
    }
    .alarm {
      margin-top: 4px;
      width: 60px;
      height: 50px;
      &:hover {
        background: #9b9b9b;
        border-radius: 50%;
      }
      text-align: center;
    }
  `,
  LogoutTab: styled.div`
    margin-left: auto; // 로그아웃 탭만 오른쪽으로 보냅니다.
    margin-right: 20px;
  `,
  CustomNav: styled(Nav)`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,

  CustomNavLink: styled(NavLink)`
    margin-right: 5px;
    margin-left: 30px;
    padding: 17px 15px;
    color: #034f9e;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.5s;

    &:hover {
      background-color: #ffffff;
      border-color: #adadad;
    }
  `,
  HamburgerMenu: styled.div`
    background-color: #d5dfe9;
    border: 0px solid #034f9e;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2); // 약간의 그림자 효과 추가
    z-index: 1001;
    width: 150px; // 메뉴의 폭을 설정. 필요에 따라 조절 가능
    .dropdown-item {
      // Bootstrap의 Dropdown.Item에 스타일 적용
      color: #034f9e;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover {
        background-color: #ffffff;
        border-color: #adadad;
      }
    }
  `,
  AlarmCount: styled.div`
    color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #d1180b;
    opacity: 0.9;
    text-align: center;
    font-size: 15px;
    margin: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-left: 1px;
    position: relative;
    left: 28.5px;
    top: -37.5px;
  `,
};

export default Header;
