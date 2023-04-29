import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../Firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => ({ ...state }));

	const roleBasedRedirect = (res, navigate) => {
		if (res.data.role === "admin") {
			navigate("/admin/dashboard");
		} else if (res.data.role === "subscriber") {
			navigate("/user/history");
		}
	};

	useEffect(() => {
		if (user && user.token) navigate("/");
	}, [user]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.table(email, password);
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
			const result = await auth.signInWithEmailAndPassword(email, password);
			console.log(result);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			createOrUpdateUser(idTokenResult.token)
				.then((res) => {
					dispatch({
						type: "LOGGED_IN_USER",
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					roleBasedRedirect(res, navigate);
					toast.success(`Welcome ${user.email}`);
				})
				.catch((err) => console.log("create err", err));
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
		}
	};
	const googleLogin = async () => {
		console.log("google login");
		googleAuthProvider.setCustomParameters({
			prompt: "select_account",
		});
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				console.log(result);
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createOrUpdateUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: "LOGGED_IN_USER",
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
						roleBasedRedirect(res, navigate);
					})
					.catch((err) => console.log("create err", err));

				toast.success(`Welcome ${user.email}`);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};
	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<br />

			<Button
				onClick={handleSubmit}
				type="primary"
				className="mb-3"
				block
				shape="round"
				icon={<MailOutlined />}
				size="large"
				disabled={!email || password.length < 6}
			>
				Login with Email/Password
			</Button>
		</form>
	);
	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-mid-6 ">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Login</h4>
					)}

					{loginForm()}
					<Button
						onClick={googleLogin}
						type="primary"
						className="mb-3"
						block
						shape="round"
						icon={<GoogleOutlined />}
						size="large"
						danger
					>
						Login with Google
					</Button>

					<Link to="/forgot/password" className="float-right text-danger">
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
