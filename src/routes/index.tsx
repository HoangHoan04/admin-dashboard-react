import { ROUTES } from "@/common/routes";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AppLayout from "@/layout/AppLayout";
import AuthLayout from "@/layout/AuthLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/LoginPage";
import HomePage from "@/pages/main/home";
import ComingSoon from "@/pages/other/ComingSoon";
import NotFound from "@/pages/other/NotFound";
import ServerError from "@/pages/other/ServerError";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ForgotPassword />} />
      </Route>

      <Route path="/login" element={<Navigate to={ROUTES.AUTH.LOGIN.path} replace />} />
      <Route
        path="/forgot-password"
        element={<Navigate to={ROUTES.AUTH.FORGOT_PASSWORD.path} replace />}
      />

      <Route
        path={ROUTES.MAIN.OTHER.children.ERROR_SERVER.path}
        element={<ServerError />}
      />
      <Route
        path={ROUTES.MAIN.OTHER.children.COMING_SOON.path}
        element={<ComingSoon />}
      />

      <Route element={<PrivateRoute />}>
        <Route
          element={
            <ErrorBoundary>
              <AppLayout />
            </ErrorBoundary>
          }
        >
          <Route index element={<HomePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
