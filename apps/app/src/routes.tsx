import { Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { createRoutes } from "react-router-yesterday";

// import { AuthOnly, GuestOnly, StudentRoleOnly, OrganizationRoleOnly, UnknownRoleOnly } from "~/components/core";

import IndexPage from "~/pages/index/page";
import NotFoundPage from "~/pages/404/page";

import OrganizationPage from "~/pages/organization/page";
import OrganizationIndexPage from "~/pages/organization/pages/index/page";
import OrganizationFormPage from "~/pages/organization/pages/form/page";
import OrganizationLinkPage from "~/pages/organization/pages/link/page";
import OrganizationSettingsPage from "~/pages/organization/pages/settings/page";

import StudentPage from "~/pages/student/page";
import StudentIndexPage from "~/pages/student/pages/index/page";
import StudentFormPage from "~/pages/student/pages/form/page";
import StudentLinkPage from "~/pages/student/pages/link/page";
import StudentSettingsPage from "~/pages/student/pages/settings/page";

import UnknownPage from "~/pages/unknown/page";
import UnknownIndexPage from "~/pages/unknown/pages/index/page";
import UnknownSettingsPage from "~/pages/unknown/pages/settings/page";

import SignInPage from "~/pages/sign-in/page";
import SignUpPage from "~/pages/sign-up/page";

import AuthActionPage from "~/pages/auth/pages/action/page";
import AuthEmailVerificationPage from "~/pages/auth/pages/email-verification/page";

const RootRoutes = createRoutes((route) => {
  const routes: RouteObject[] = [
    route.element(<Outlet />, [
      //  /organization
      //  /organization/form
      //  /organization/link
      //  /organization/settings
      route.path("organization", <OrganizationPage />, [
        //
        route.index(<OrganizationIndexPage />),
        route.path("form", <OrganizationFormPage />),
        route.path("form/:id", <div>OrganizationFormByIdPage</div>),
        route.path("link", <OrganizationLinkPage />),
        route.path("settings", <OrganizationSettingsPage />),
      ]),

      //  /student
      //  /student/form
      //  /student/link
      //  /student/settings
      route.path("student", <StudentPage />, [
        //
        route.index(<StudentIndexPage />),
        route.path("form", <StudentFormPage />),
        route.path("form/:id", <div>StudentFormByIdPage</div>),
        route.path("link", <StudentLinkPage />),
        route.path("settings", <StudentSettingsPage />),
      ]),

      //  /unknown
      //  /unknown/settings
      route.path("unknown", <UnknownPage />, [
        //
        route.index(<UnknownIndexPage />),
        route.path("settings", <UnknownSettingsPage />),
      ]),
    ]),

    //  /sign-in
    //  /sign-up
    route.element(<Outlet />, [
      //
      route.path("sign-in", <SignInPage />),
      route.path("sign-up", <SignUpPage />),
    ]),

    //  /auth/action
    //  /auth/email-verification
    route.element(<Outlet />, [
      //
      route.path("auth/action", <AuthActionPage />),
      route.path("auth/email-verification", <AuthEmailVerificationPage />),
    ]),

    route.index(<IndexPage />),

    route.catch(<NotFoundPage />),
  ];

  return routes;
});

export type { RoutesProps as RootRoutesProps } from "react-router-yesterday";
export default RootRoutes;
