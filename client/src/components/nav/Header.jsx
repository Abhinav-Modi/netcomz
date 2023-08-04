import React, { useState } from "react";

import { Menu } from "antd";
import {
	AppstoreOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState("home");
	const navigate = useNavigate();
	let dispatch = useDispatch();

	let { user } = useSelector((state) => ({ ...state }));
	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: "LOGOUT",
			payload: null,
		});
		// history.push("/login");
		navigate("/login");
	};
	return (
		<Menu
			onClick={(e) => setCurrent(e.key)}
			selectedKeys={[current]}
			mode="horizontal"
		>
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>
			{!user && (
				<Item key="register" icon={<UserAddOutlined />}>
					<Link to="/register">Register</Link>
				</Item>
			)}
			{!user && (
				<Item key="login" icon={<UserOutlined />}>
					<Link to="/login">Login</Link>
				</Item>
			)}
			{user && (
				<SubMenu
					key="SubMenu"
					icon={<SettingOutlined />}
					title={user.email && user.email.split("@")[0]}
				>
					{user && user.role === "subscriber" && (
						<Item>
							<Link to="/user/history">Dashboard</Link>
						</Item>
					)}
					{user && user.role === "admin" && (
						<Item>
							<Link to="/admin/dashboard">Dashboard</Link>
						</Item>
					)}
					<Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
