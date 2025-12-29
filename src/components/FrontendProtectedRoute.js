import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FrontendContext from "../context/FrontendContext";

const FrontendProtectedRoute = ({ children }) => {
  const { Frontend_user } = useContext(FrontendContext);
  const location = useLocation();

  if (!Frontend_user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default FrontendProtectedRoute;
