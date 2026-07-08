import { ROUTES } from "@/common/routes";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AppLayout from "@/layout/AppLayout";
import AuthPage from "@/pages/auth/AuthPage";
import HomePage from "@/pages/main/home";
import EmployeePage from "@/pages/main/human-resource/employee-manager";
import RolePage from "@/pages/main/role";
import AuditLogPage from "@/pages/main/setting-system/audit-log";
import ComingSoon from "@/pages/other/ComingSoon";
import NotFound from "@/pages/other/NotFound";
import ServerError from "@/pages/other/ServerError";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.AUTH.LOGIN.path} element={<AuthPage />} />
      <Route path={ROUTES.AUTH.FORGOT_PASSWORD.path} element={<AuthPage />} />
      <Route path={ROUTES.AUTH.RESET_PASSWORD.path} element={<AuthPage />} />

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

          <Route
            path={ROUTES.MAIN.HUMAN_RESOURCE.children.EMPLOYEE_LIST.path}
            element={<EmployeePage />}
          />
          <Route
            path={ROUTES.MAIN.ROLE_MANAGER.children.ROLE_LIST.path}
            element={<RolePage />}
          />

          <Route
            path={ROUTES.MAIN.SETTING_SYSTEM.children.AUDIT_LOG.path}
            element={<AuditLogPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
