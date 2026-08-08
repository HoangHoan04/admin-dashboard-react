import { CogIcon, HouseIcon, UsersIcon } from "lucide-react";
export * from "../utils/route.utils";

export const ROUTES = {
  AUTH: {
    LOGIN: {
      key: "LOGIN",
      label: "routes.login",
      translationKey: "routes.login",
      path: "/auth/login",
      isShow: false,
    },
    FORGOT_PASSWORD: {
      key: "FORGOT_PASSWORD",
      label: "routes.forgotPassword",
      translationKey: "routes.forgotPassword",
      path: "/auth/forgot-password",
      isShow: false,
    },
    RESET_PASSWORD: {
      key: "RESET_PASSWORD",
      label: "routes.resetPassword",
      translationKey: "routes.resetPassword",
      path: "/auth/reset-password",
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
    },

    COMPONENTS: {
      key: "COMPONENTS",
      label: "routes.components",
      translationKey: "routes.components",
      icon: UsersIcon,
      path: "/components",
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
