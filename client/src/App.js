import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header.jsx";
import RegisterComplete from "./pages/auth/RegisterComplete";
import History from "./pages/user/History";
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
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/register/complete" element={<RegisterComplete />} />
				<Route path="/forgot/password" element={<ForgotPassword />} />
				{user && user.token ? (
					<Route path="/user/history" element={<History />} />
				) : null}
			</Routes>
		</Router>
	);
};

export default App;
