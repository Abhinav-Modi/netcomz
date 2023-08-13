import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header.jsx";
import RegisterComplete from "./pages/auth/RegisterComplete";
import History from "./pages/user/History";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import SideDrawer from "./components/drawer/SideDrawer";
import AdminRoute from "./components/routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import { useSelector } from "react-redux";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				currentUser(idTokenResult.token)
					.then((res) =>
						dispatch({
							type: "LOGGED_IN_USER",
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						})
					)
					.catch((err) => console.log("create err", err));
			}
		});

		// cleanup
		return () => unsubscribe();
	}, []);

	const { user } = useSelector((state) => ({ ...state }));
	return (
		<Router>
			<Header />
			<ToastContainer />
			<SideDrawer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/register/complete" element={<RegisterComplete />} />
				<Route path="/forgot/password" element={<ForgotPassword />} />
				{user && user.token ? (
					<Route path="/user/history" element={<History />} />
				) : null}
				{user && user.token ? (
					<Route path="/user/password" element={<Password />} />
				) : null}
				{user && user.token ? (
					<Route path="/user/wishlist" element={<Wishlist />} />
				) : null}
				{/* <AdminRoute path="/admin/dashboard" element={<AdminDashboard />} /> */}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/category" element={<CategoryCreate />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/category/:slug" element={<CategoryUpdate />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/sub" element={<SubCreate />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/sub/:slug" element={<SubUpdate />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/product" element={<ProductCreate />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/products" element={<AllProducts />} />
				) : null}
				{user && user.token && user.role === "admin" ? (
					<Route path="/admin/product/:slug" element={<ProductUpdate />} />
				) : null}
				<Route path="/product/:slug" element={<Product />} />
				<Route path="/category/:slug" element={<CategoryHome />} />
				<Route path="/sub/:slug" element={<SubHome />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/cart" element={<Cart />} />
				{user && user.token ? (
					<Route path="/checkout" element={<Checkout />} />
				) : null}
				{user && user.token ? (
					<Route path="/payment" element={<Payment />} />
				) : null}
			</Routes>
		</Router>
	);
};

export default App;
