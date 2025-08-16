import React from "react";
import { Navigate } from "react-router-dom";

// Helper to read a specific cookie
const getCookie = (name) => {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getCookie("devjwt"); // Check if 'jwt' cookie exists
  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);
  

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;