import { memo } from "react";

import App from "next/app";
import type { AppContext, AppInitialProps, AppPropsWithLayout } from "next/app";

import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import type { ThemeSystemState } from "@unej-io/ui/core";

import { disableDevtools } from "react-yesterday";

import { APP } from "~/const/app";

import { AuthProvider, Head, RootProvider, ThemeProvider } from "~/components/core";

import { getColorSchemeCookie, getPrimaryColorCookie, getDefaultRadiusCookie } from "~/stores/theme";

import "~/assets/css/style.css";
// import "~/assets/fonts/index.css";

if (process.env.NODE_ENV === "production") typeof window !== "undefined" && disableDevtools();

const AppHead = memo(() => {
  return (
    <Head>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP.link.self}/`} />
      <meta property="og:title" content={APP.description} />
      <meta property="og:description" content={APP.description} />
      <meta property="og:image" content={`${APP.link.self}/Cover.png`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${APP.link.self}/`} />
      <meta property="twitter:title" content={APP.description} />
      <meta property="twitter:description" content={APP.description} />
      <meta property="twitter:image" content={`${APP.link.self}/Cover.png`} />
    </Head>
  );
});

type ExtraAppProps = Partial<ThemeSystemState>;

type _AppProps = AppPropsWithLayout & ExtraAppProps;

function _App({ Component, pageProps, colorScheme, primaryColor, defaultRadius }: _AppProps) {
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);

  return (
    <>
      <AppHead />

      <ThemeProvider colorScheme={colorScheme} primaryColor={primaryColor} defaultRadius={defaultRadius}>
        <Notifications />

        <ModalsProvider>
          <AuthProvider>
            <RootProvider>{getLayout(<Component {...pageProps} />)}</RootProvider>
          </AuthProvider>
        </ModalsProvider>
      </ThemeProvider>
    </>
  );
}

_App.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps & ExtraAppProps> => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);

  const { req, res } = appContext.ctx;

  return {
    ...appProps,
    ...({
      colorScheme: getColorSchemeCookie({ req, res }),
      primaryColor: getPrimaryColorCookie({ req, res }),
      defaultRadius: getDefaultRadiusCookie({ req, res }),
    } as ExtraAppProps),
  };
};

export type { _AppProps };
export default _App;
