import { useState, useEffect } from "react";
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

function SideBar() {
  const [selectedMenu, setSelectedMenu] = useState(false);
  const [data, setData] = useState([]);
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
    <MenuItem key={index}>{item.modelId}</MenuItem>
  ));

  return (
    <Sidebar>
      <Menu>{companies}</Menu>
    </Sidebar>
  );
}

export default SideBar;
