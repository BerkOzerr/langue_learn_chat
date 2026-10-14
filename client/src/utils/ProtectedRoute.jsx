import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("guestName");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
