import React, { useState } from "react";

import { Menu, Badge } from "antd";

import {
	AppstoreOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState("home");
	const navigate = useNavigate();
	let dispatch = useDispatch();

	let { user, cart } = useSelector((state) => ({ ...state }));
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
			className="bg-warning text-dark d-flex align-items-center   font-monospace bg-opacity-25"
		>
			<div>
				<Item key="home" icon={<AppstoreOutlined />}>
					<Link to="/">Home</Link>
				</Item>
				<Item key="shop" icon={<ShoppingOutlined />}>
					<Link to="/shop">Shop</Link>
				</Item>

				<Item key="cart" icon={<ShoppingCartOutlined />}>
					<Link to="/cart">
						<Badge count={cart.length} offset={[9, 0]}>
							Cart
						</Badge>
					</Link>
				</Item>
			</div>
			<div className="d-flex align-items-center ">
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
				<div className="">
					<Search />
				</div>
			</div>
		</Menu>
	);
};

export default Header;
