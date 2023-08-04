import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ isAllowed, redirectTo, element: Component }) => {
	if (!isAllowed) {
		return <Navigate to={redirectTo || "/login"} replace />;
	}
	return Component;
};

export default UserRoute;
