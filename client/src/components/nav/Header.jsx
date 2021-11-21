import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let {user} = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
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
        title={user ? user.email.split('@')[0] : "User"}
      >
        {!user && (
          <>
            <Item key="register">
              <Link to="/register">Register</Link>
            </Item>
            <Item key="login">
              <Link to="/login">Login</Link>
            </Item>
          </>
        )}

        {user && (
          <Item key="logout" onClick={logout}>
            Logout
          </Item>
        )}
      </SubMenu>
    </Menu>
  );
};

export default Header;
