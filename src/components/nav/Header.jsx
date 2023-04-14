import React, { useState } from "react";

import { Menu } from "antd";
import {
	AppstoreOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState("home");

	return (
		<Menu
			onClick={(e) => setCurrent(e.key)}
			selectedKeys={[current]}
			mode="horizontal"
		>
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>

			<Item key="register" icon={<UserAddOutlined />}>
				<Link to="/register">Register</Link>
			</Item>
			<Item key="login" icon={<UserOutlined />}>
				<Link to="/login">Login</Link>
			</Item>

			<SubMenu key="SubMenu" icon={<SettingOutlined />} title="Dashboard">
				<Item key="setting:1">Option 1</Item>
				<Item key="setting:2">Option 2</Item>
			</SubMenu>
		</Menu>
	);
};

export default Header;
