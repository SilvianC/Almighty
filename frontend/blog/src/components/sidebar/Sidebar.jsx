import { useState, useEffect } from "react";
import Logo from "../../assets/images/sdilogo.png";
import http from "../../api/http";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import styled from "styled-components";

const SideBar = (currentStatus) => {
  const [data, setData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    http
      .get(`/api/batteries/progress/request`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);

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
          onClick={() => setSelectedMenu(`${index}-${itemIndex}`)}
        >
          <div>
            {item.companyName} {item.modelName}
          </div>
        </MenuItem>
      ))}
    </SubMenu>
  ));

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleMouseMove = (e) => {
    console.log("detecting");
    if (e.clientX < 90) {
      console.log("show");
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <ModalBackground showSidebar={isSidebarVisible} />
      <SidebarContainer showSidebar={isSidebarVisible}>
        <StyledSidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#d5dfe9",
            },
          }}
        >
          <LogoStyle src={Logo}></LogoStyle>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 1)
                  return {
                    color: active ? "#1d1f25" : "#888888",
                    backgroundColor: active ? "#e7ecf2" : "#d5dfe9",
                  };
              },
            }}
          >
            {menuItems}
          </Menu>
        </StyledSidebar>
      </SidebarContainer>
    </div>
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 10%;
  height: 100%;
  background: transparent;
  ${(props) => (props.showSidebar ? "block" : "none")};
`;

const SidebarContainer = styled.div`
  height: 100%;
  background-color: #333;
  color: #fff;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: ${(props) => (props.showSidebar ? "0" : "-250px")};
  transition: left 0.5s;
  z-index: 999;
  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox 브라우저에 대한 스크롤바 숨김 */
  scrollbar-width: none;
  box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
    0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);
`;

const StyledSidebar = styled(Sidebar)`
  width: 250px;
`;

const LogoStyle = styled.img`
  width: 160px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 30px;
  cursor: pointer;
`;

export default SideBar;
