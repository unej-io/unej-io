import type { ComponentType, ReactElement, ReactNode } from "react";

import type { NextPageContext, NextPageWithLayout } from "next";
import type { AppInitialProps } from "next/app";
import { Router } from "next/router";

declare module "next" {
  export type GetLayout = (page: ReactElement) => ReactNode;

  export type NextPageWithLayout<P = {}, IP = P> = ComponentType<P> & {
    getInitialProps?(context: NextPageContext): IP | Promise<IP>;
  } & {
    getLayout?: GetLayout;
  };
}

declare module "next/app" {
  export type AppPropsWithLayout<P = {}> = AppInitialProps & {
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    __N_RSC?: boolean;
  } & {
    Component: NextPageWithLayout<P>;
  };
}
