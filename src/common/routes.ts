import { CogIcon, HouseIcon, Settings, Shield, UsersIcon } from "lucide-react";
export * from "../utils/route.utils";

export const ROUTES = {
  AUTH: {
    LOGIN: {
      key: "LOGIN",
      label: "routes.login",
      translationKey: "routes.login",
      path: "/login",
      isShow: false,
    },
    FORGOT_PASSWORD: {
      key: "FORGOT_PASSWORD",
      label: "routes.forgotPassword",
      translationKey: "routes.forgotPassword",
      path: "/forgot-password",
      isShow: false,
    },
    RESET_PASSWORD: {
      key: "RESET_PASSWORD",
      label: "routes.resetPassword",
      translationKey: "routes.resetPassword",
      path: "/reset-password",
      isShow: false,
    },
  },

  MAIN: {
    HOME: {
      key: "HOME",
      label: "routes.home",
      translationKey: "routes.home",
      path: "/",
      icon: HouseIcon,
      isShow: false,
    },

    HUMAN_RESOURCE: {
      key: "HUMAN_RESOURCE",
      label: "routes.humanResource",
      translationKey: "routes.humanResource",
      icon: UsersIcon,
      path: "/human-resource",
      children: {
        EMPLOYEE_LIST: {
          key: "EMPLOYEE_LIST",
          label: "routes.employeeList",
          translationKey: "routes.employeeList",
          path: "/human-resource/employee",
        },
      },
    },

    ROLE_MANAGER: {
      key: "ROLE_MANAGER",
      label: "routes.roleManager",
      translationKey: "routes.roleManager",
      icon: Shield,
      path: "/role-manager",
      children: {
        ROLE_LIST: {
          key: "ROLE_LIST",
          label: "routes.roleList",
          translationKey: "routes.roleList",
          path: "/role-manager/roles",
        },
      },
    },

    SETTING_SYSTEM: {
      key: "SETTING_SYSTEM",
      label: "routes.settingSystem",
      translationKey: "routes.settingSystem",
      icon: Settings,
      path: "/system-settings",
      children: {
        AUDIT_LOG: {
          key: "AUDIT_LOG",
          label: "routes.auditLog",
          translationKey: "routes.auditLog",
          path: "/system-settings/audit-logs",
        },
      },
    },

    OTHER: {
      key: "OTHER",
      label: "routes.other",
      translationKey: "routes.other",
      icon: CogIcon,
      children: {
        ERROR_SERVER: {
          key: "500_ERROR",
          label: "routes.serverError",
          translationKey: "routes.serverError",
          path: "/500",
        },
        NOT_FOUND: {
          key: "NOT_FOUND",
          label: "routes.notFound",
          translationKey: "routes.notFound",
          path: "/404",
        },
        COMING_SOON: {
          key: "COMING_SOON",
          label: "routes.comingSoon",
          translationKey: "routes.comingSoon",
          path: "/coming-soon",
        },
      },
    },
  },
} as const;
