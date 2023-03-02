import { Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { createRoutes } from "react-router-yesterday";

// import { AuthOnly, GuestOnly, StudentRoleOnly, OrganizationRoleOnly, UnknownRoleOnly } from "~/components/core";

import NotFoundPage from "~/pages/404/page";

const RootRoutes = createRoutes((route) => {
  const routes: RouteObject[] = [
    route.element(<Outlet />, [
      route.lazy.path("sign-in", () => import("~/pages/sign-in/page")),
      route.lazy.path("sign-up", () => import("~/pages/sign-up/page")),
    ]),

    route.index(<Navigate to="/sign-in" />),

    route.catch(<NotFoundPage />),
  ];

  return routes;
});

export type { RoutesProps as RootRoutesProps } from "react-router-yesterday";
export default RootRoutes;
