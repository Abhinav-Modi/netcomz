import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header.jsx";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Firebase";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				console.log("user", user);
				dispatch({
					type: "LOGGED_IN_USER",
					payload: {
						email: user.email,
						token: idTokenResult.token,
					},
				});
			}
		});
		// cleanup
		return () => unsubscribe();
	}, []);

	return (
		<Router>
			<Header />
			<ToastContainer />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/register/complete" element={<RegisterComplete />} />
			</Routes>
		</Router>
	);
};

export default App;
