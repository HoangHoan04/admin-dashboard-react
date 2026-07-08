import { getRouteByPath, ROUTES } from "@/common/routes";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const paths = path.split("/").filter(Boolean);
    const breadcrumbList: {
      label: string;
      url: string;
      isLast: boolean;
      icon?: any;
    }[] = [];

    const dashboardRoute = getRouteByPath(ROUTES.MAIN.HOME.path);
    breadcrumbList.push({
      label: dashboardRoute
        ? t(dashboardRoute.label) || dashboardRoute.label
        : t("routes.home"),
      url: ROUTES.MAIN.HOME.path,
      isLast: path === ROUTES.MAIN.HOME.path || paths.length === 0,
      icon: dashboardRoute?.icon,
    });

    let currentUrl = "";
    paths.forEach((segment, idx) => {
      currentUrl += `/${segment}`;
      if (segment === ROUTES.MAIN.HOME.path) return;

      const route = getRouteByPath(currentUrl);
      if (route) {
        breadcrumbList.push({
          label: t(route.label) || route.label,
          url: route.path,
          isLast: idx === paths.length - 1,
          icon: route.icon,
        });
      }
    });

    return breadcrumbList;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <BreadcrumbPrimitive>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => {
          const Icon = crumb.icon;
          return (
            <React.Fragment key={crumb.url}>
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage className="font-semibold flex items-center gap-1.5 text-foreground select-none">
                    {Icon && <Icon className="size-3.5 opacity-70" />}
                    <span>{crumb.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={crumb.url}
                      className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                      {Icon && <Icon className="size-3.5 opacity-70" />}
                      <span>{crumb.label}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
};

export default AppBreadcrumb;
