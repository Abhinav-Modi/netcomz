import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));

	return (
		<Route
			{...rest}
			element={user && user.token ? children : <Navigate to="/login" replace />}
		/>
	);
};

export default UserRoute;
