import { useState, useEffect } from "react";
import Logo from "../../assets/images/sdilogo.png";
import http from "../../api/http";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import styled from "styled-components";

const SideBar = () => {
  const [data, setData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(-1);
  useEffect(() => {
    http
      .get(`/api/batteries/request`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);

  const companies = data.map((item, index) => (
    <MenuItem
      key={index}
      active={selectedMenu === index}
      onClick={() => setSelectedMenu(index)}
    >
      {item.modelId} {item.madeDate}
    </MenuItem>
  ));

  return (
    <Sidebar
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
            if (level === 0)
              return {
                color: active ? "#1d1f25" : "#888888",
                backgroundColor: active ? "#e7ecf2" : "#d5dfe9",
              };
          },
        }}
      >
        {companies}
      </Menu>
    </Sidebar>
  );
};

const LogoStyle = styled.img`
  width: 160px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 30px;
  cursor: pointer;
`;

export default SideBar;
