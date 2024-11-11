import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const PrivateRoute = () => {
  const user = useSession();
  if (!user.token) return <Navigate to="/home" />;
  console.log("user.token : ", user.token)
  return <Outlet />;
};

export default PrivateRoute;