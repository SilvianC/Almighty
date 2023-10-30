import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./SideBar.css";

const SideBar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div className={`sidebar ${expand ? "expanded" : ""}`}
         onMouseEnter={() => setExpand(true)}
         onMouseLeave={() => setExpand(false)}>
      <Nav className="flex-column">
        <Nav.Link href="#">Tab 1</Nav.Link>
        <Nav.Link href="#">Tab 2</Nav.Link>
        <Nav.Link href="#">Tab 3</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
