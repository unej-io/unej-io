import { useEffect, useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import type { HotkeyItem } from "@mantine/hooks";

import { EMOTION_CACHE, createTheme } from "@unej-io/ui/core";
import type { ThemeSystemState } from "@unej-io/ui/core";

import useThemeStore, { THEME_STORE_CHANNEL, ThemeStoreProvider } from "~/stores/theme";

type ThemeProviderChildProps = PropsWithChildren<{}>;

function ThemeProviderChild(props: ThemeProviderChildProps) {
  const { colorScheme, primaryColor, defaultRadius, toggleColorScheme, setState } = useThemeStore();

  useHotkeys(useMemo((): HotkeyItem[] => [["mod+J", () => toggleColorScheme()]], []));

  useEffect(
    () =>
      THEME_STORE_CHANNEL.onMessageListener((data) => {
        switch (data.type) {
          case "toggle-color-scheme":
            setState({ colorScheme: data.payload });
            break;

          case "set-color-scheme":
            setState({ colorScheme: data.payload });
            break;

          case "set-primary-color":
            setState({ primaryColor: data.payload });
            break;

          case "set-default-radius":
            setState({ defaultRadius: data.payload });
            break;

          default:
            break;
        }
      }),
    []
  );

  return (
    <MantineProvider
      emotionCache={EMOTION_CACHE}
      theme={useMemo(() => createTheme({ colorScheme, primaryColor, defaultRadius }), [colorScheme, primaryColor, defaultRadius])}
      withGlobalStyles
      withNormalizeCSS
    >
      {props.children}
    </MantineProvider>
  );
}

type ThemeProviderProps = PropsWithChildren<Partial<ThemeSystemState>>;

function ThemeProvider({ colorScheme, primaryColor, defaultRadius, children }: ThemeProviderProps) {
  return (
    <ThemeStoreProvider colorScheme={colorScheme} primaryColor={primaryColor} defaultRadius={defaultRadius}>
      <ThemeProviderChild>{children}</ThemeProviderChild>
    </ThemeStoreProvider>
  );
}

export type { ThemeProviderProps };
export default ThemeProvider;
