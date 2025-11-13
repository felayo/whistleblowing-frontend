import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  // Still checking silent login / refresh
  if (auth.loading) {
    return (
      <Box display="flex" justifyContent="center" py={4} >
        <CircularProgress sx={{ color: "#ff8c00" }}/>
      </Box>
    );
  }

  // If no token or user, redirect to login
  if (!auth?.accessToken || !auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // If role is restricted, validate it
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Otherwise, allow access
  return <Outlet />;
};

export default ProtectedRoute;
