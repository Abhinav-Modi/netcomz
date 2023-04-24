import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	let navigate = useNavigate();
	useEffect(() => {
		if (user && user.token) navigate("/");
	}, [user]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail("");
				setLoading(false);
				toast.success(
					`Email is sent to ${email}. Click the link to reset your password.`
				);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				toast.error(error.message);
			});
	};
	const forgotPasswordForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
				/>
			</div>
			<br />
			<Button
				type="primary"
				className="btn btn-raised"
				danger
				disabled={!email}
			>
				Submit
			</Button>
		</form>
	);
	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Forgot Password</h4>
					{forgotPasswordForm()}
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
