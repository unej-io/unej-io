import { useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";

import { EMOTION_CACHE, createTheme } from "@unej-io/ui/core";
import type { ThemeSystemState } from "@unej-io/ui/core";

import useThemeStore from "~/stores/theme";

type ThemeStaticProviderProps = PropsWithChildren<Partial<Pick<ThemeSystemState, "primaryColor" | "defaultRadius">>>;

function ThemeStaticProvider(props: ThemeStaticProviderProps) {
  const store = useThemeStore(),
    colorScheme = store.colorScheme,
    primaryColor = props.primaryColor ?? store.primaryColor,
    defaultRadius = props.defaultRadius ?? store.defaultRadius;

  return (
    <MantineProvider
      emotionCache={EMOTION_CACHE}
      theme={useMemo(() => createTheme({ colorScheme, primaryColor, defaultRadius }), [colorScheme, primaryColor, defaultRadius])}
    >
      {props.children}
    </MantineProvider>
  );
}

export type { ThemeStaticProviderProps };
export default ThemeStaticProvider;
