import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <SubMenu
        className="ms-auto"
        key="userDropdown"
        icon={<UserOutlined />}
        title="User"
      >
        <Item key="login">
          <Link to="/login">Login</Link>
        </Item>
        <Item key="register">
          <Link to="/register">Register</Link>
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
