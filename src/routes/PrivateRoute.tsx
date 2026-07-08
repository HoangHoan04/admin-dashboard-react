import { Navigate, Outlet } from "react-router-dom";
import { tokenCache } from "@/utils/token";

const PrivateRoute = () => {
  return tokenCache.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
