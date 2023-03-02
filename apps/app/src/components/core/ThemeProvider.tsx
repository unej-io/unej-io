import { useEffect, useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import type { HotkeyItem } from "@mantine/hooks";

import { EMOTION_CACHE, createTheme } from "@unej-io/ui/core";

import useThemeStore, { THEME_STORE_CHANNEL } from "~/stores/theme";

type ThemeProviderProps = PropsWithChildren<{}>;

function ThemeProvider(props: ThemeProviderProps) {
  const { colorScheme, primaryColor, defaultRadius, toggleColorScheme } = useThemeStore();

  useHotkeys(useMemo((): HotkeyItem[] => [["mod+J", () => toggleColorScheme()]], []));

  useEffect(
    () =>
      THEME_STORE_CHANNEL.onMessageListener((data) => {
        switch (data.type) {
          case "toggle-color-scheme":
            useThemeStore.setState({ colorScheme: data.payload });
            break;

          case "set-color-scheme":
            useThemeStore.setState({ colorScheme: data.payload });
            break;

          case "set-primary-color":
            useThemeStore.setState({ primaryColor: data.payload });
            break;

          case "set-default-radius":
            useThemeStore.setState({ defaultRadius: data.payload });
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

export type { ThemeProviderProps };
export default ThemeProvider;
