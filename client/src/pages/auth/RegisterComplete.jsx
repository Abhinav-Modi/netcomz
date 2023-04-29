import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user } = useSelector((state) => ({ ...state }));

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		setEmail(window.localStorage.getItem("emailForRegistration"));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// validation using firebase
		if (!email || !password) {
			toast.error("Email and password is required");
			return; //try catch block wont execute
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			); //get email and link
			console.log("RESULT", result);
			if (result.user.emailVerified) {
				// remove user email from local storage
				window.localStorage.removeItem("emailForRegistration");
				// get user id token
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
				// redux store
				console.log("user", user, "idTokenResult", idTokenResult);
				createOrUpdateUser(idTokenResult.token)
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
				// redirect
				navigate("/");
			}
		} catch (error) {
			console.log("ERROR", error);
			toast.error(error.message);
		}
	};
	const completeRegisterationForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				placeholder="Your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				disabled
			/>
			<br />
			<input
				type="password"
				className="form-control"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoFocus
			/>
			<br />

			<button type="submit" className="btn btn-raised btn-primary">
				Complete Registration
			</button>
		</form>
	);
	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-mid-6 ">
					<h4>Complete Registration</h4>

					{completeRegisterationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
