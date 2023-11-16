import { useState, useEffect } from "react";
import http from "../../api/http";
import {
  BiChevronLeftCircle,
  BiChevronRightCircle,
  BiChevronsDown,
  BiChevronsUp,
} from "react-icons/bi";

import { FiEdit, FiCheckSquare } from "react-icons/fi";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import styled from "styled-components";

const SideBar = ({ progress, setProgress }) => {
  const [currentStatus, setCurrentStatus] = useState("request");
  const [data, setData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleClick = (index, itemIndex, item) => {
    setSelectedMenu(`${index}-${itemIndex}`);
    setProgress(() => item.id);
  };

  const statusButtonClick = () => {
    if (currentStatus === "request") {
      setCurrentStatus("finished");
    } else if (currentStatus === "finished") {
      setCurrentStatus("request");
    }
  };

  // useEffect(() => {
  //   http
  //     .get(`/api/batteries/progress/${currentStatus}`)
  //     .then(({ data }) => {
  //       setData(() => {
  //         return data["data"];
  //       });
  //     })
  //     .catch();
  // }, []);

  useEffect(() => {
    http
      .get(`/api/batteries/progress/${currentStatus}`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();
  }, [currentStatus]);

  const groupedData = data.reduce((result, item) => {
    const date = item.createDate;
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(item);
    return result;
  }, {});

  const menuItems = Object.entries(groupedData).map(([date, items], index) => (
    <SubMenu
      key={index}
      label={elapsedTime(date)}
      defaultOpen={true}
      disabled={true}
    >
      {items.map((item, itemIndex) => (
        <MenuItem
          key={`${index}-${itemIndex}`}
          active={selectedMenu === `${index}-${itemIndex}`}
          onClick={() => {
            handleClick(index, itemIndex, item);
          }}
        >
          <div>
            {item.companyName} {item.code}
          </div>
        </MenuItem>
      ))}
    </SubMenu>
  ));
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonClicked, setButtonClicked] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Wrapper pushSidebar={isButtonClicked}>
      <ToggleButton
        showSidebar={isButtonClicked || isHovering}
        onClick={() => {
          setButtonClicked(!isButtonClicked);
        }}
      >
        {isButtonClicked ? (
          <BiChevronLeftCircle size={30} color="#034f9e" />
        ) : (
          <BiChevronRightCircle size={30} color="#034f9e" />
        )}
      </ToggleButton>
      <SidebarContainer
        showSidebar={isButtonClicked || isHovering}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <StyledSidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#d5dfe9",
            },
          }}
        >
          <SidebarContent>
            <SidebarTitle>
              {currentStatus === "request" ? (
                <>
                  <FiEdit size={20} /> 분석 요청 리스트
                </>
              ) : (
                <>
                  <FiCheckSquare size={20} />
                  분석 완료 리스트
                </>
              )}
            </SidebarTitle>
            <ProgressList>
              <Menu
                menuItemStyles={{
                  button: ({ level, active, disabled }) => {
                    // only apply styles on first level elements of the tree
                    if (level === 1)
                      return {
                        color: active ? "#1d1f25" : "#000000",
                        backgroundColor: active ? "#e7ecf2" : "#d5dfe9",
                      };
                  },
                }}
              >
                {menuItems}
              </Menu>
            </ProgressList>
            <StatusButton showSidebar={isButtonClicked || isHovering}>
              {currentStatus === "finished" ? (
                <>
                  <div onClick={statusButtonClick}>
                    <FiEdit size={20} />
                    분석 요청 리스트로
                  </div>
                </>
              ) : (
                <>
                  <div onClick={statusButtonClick}>
                    <FiCheckSquare size={20} />
                    분석 완료 리스트로
                  </div>
                </>
              )}
            </StatusButton>
          </SidebarContent>
        </StyledSidebar>
      </SidebarContainer>
    </Wrapper>
  );
};

function elapsedTime(date) {
  const start = new Date(date);
  const end = new Date();

  const diff = (end - start) / 1000;

  const formatter = new Intl.RelativeTimeFormat("ko", {
    numeric: "auto",
  });

  const times = [
    { name: "year", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "month", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "day", milliSeconds: 60 * 60 * 24 },
    { name: "hour", milliSeconds: 60 * 60 },
    { name: "minute", milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return formatter.format(-betweenTime, value.name);
    }
  }
  return "오늘";
}

const Wrapper = styled.div`
  margin-right: ${(props) => (props.pushSidebar ? "250px" : "0")};
  transition: margin-right 0.5s;
`;

const SidebarContainer = styled.div`
  height: 100%;
  background-color: #d5dfe9;
  color: #fff;
  font-weight: bold;
  position: fixed;
  overflow-y: hidden;

  top: 0;
  left: ${(props) => (props.showSidebar ? "0" : "-230px")};

  transition: left 0.5s, margin-right 0.5s;
  z-index: 99;

  box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
    0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);
`;

const StyledSidebar = styled(Sidebar)`
  top: 60px;
  width: 250px;
`;

const ToggleButton = styled.div`
  position: fixed;
  top: 10%;
  cursor: pointer;
  border-radius: 100%;
  // color: #d5dfe9;
  left: ${(props) => (props.showSidebar ? "235px" : "5px")};
  transition: left 0.5s, opacity 0.5s linear;
  z-index: 100;
  box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
    0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);
`;

const StatusButton = styled.div`
  cursor: pointer;
  color: #034f9e;
  bottom: 10px;
`;

const SidebarTitle = styled.div`
  display: flex;
  justify-content: center;
  color: #034f9e;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  align-items: center;
`;

const ProgressList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export default SideBar;
