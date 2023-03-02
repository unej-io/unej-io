import { createContext, useMemo } from "react";
import type { PropsWithChildren } from "react";

import { createStore } from "zustand";
import type { StoreApi } from "zustand";

import { BroadcastChannel } from "broadcast-channel";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import type { OptionsType } from "cookies-next/lib/types";

import type { ColorScheme, MantineColor, MantineSize } from "@mantine/core";

import { DEFAULT_THEME_SYSTEM_VALUE, isValidColorScheme, isValidPrimaryColor, isValidDefaultRadius } from "@unej-io/ui/core";
import type { ThemeSystemState } from "@unej-io/ui/core";

import { createBoundedUseContextStore, withDevtools } from "./@utilities";

const NAME = "unej-io:theme-store";

type TypePayload<T, P> = { type: T; payload: P };
type ThemeStoreMessageData =
  | TypePayload<"toggle-color-scheme", ColorScheme>
  | TypePayload<"set-color-scheme", ColorScheme>
  | TypePayload<"set-primary-color", MantineColor>
  | TypePayload<"set-default-radius", MantineSize>;
const THEME_BROADCAST_CHANNEL: BroadcastChannel<ThemeStoreMessageData> | null =
  typeof window !== "undefined" ? new BroadcastChannel<ThemeStoreMessageData>(NAME) : null;
const THEME_STORE_CHANNEL = {
  onMessageListener(handler: (data: ThemeStoreMessageData) => void) {
    THEME_BROADCAST_CHANNEL?.addEventListener("message", handler);

    return () => {
      THEME_BROADCAST_CHANNEL?.removeEventListener("message", handler);
    };
  },
  toggleColorScheme(payload: ColorScheme) {
    THEME_BROADCAST_CHANNEL?.postMessage({ type: "toggle-color-scheme", payload });
  },
  setColorScheme(payload: ColorScheme) {
    THEME_BROADCAST_CHANNEL?.postMessage({ type: "set-color-scheme", payload });
  },
  setPrimaryColor(payload: MantineColor) {
    THEME_BROADCAST_CHANNEL?.postMessage({ type: "set-primary-color", payload });
  },
  setDefaultRadius(payload: MantineSize) {
    THEME_BROADCAST_CHANNEL?.postMessage({ type: "set-default-radius", payload });
  },
};

const COOKIE_NAME = { colorScheme: NAME + ":color-scheme", primaryColor: NAME + ":primary-color", defaultRadius: NAME + ":default-radius" };
const COOKIE_EXPIRES = 15552000000;
const expires = () => new Date(new Date().getTime() + COOKIE_EXPIRES);
const setColorSchemeCookie = (colorScheme: ColorScheme, options: OptionsType = {}) => {
  setCookie(COOKIE_NAME.colorScheme, colorScheme, { ...options, expires: expires() });
  return colorScheme;
};
const setPrimaryColorCookie = (primaryColor: MantineColor, options: OptionsType = {}) => {
  setCookie(COOKIE_NAME.primaryColor, primaryColor, { ...options, expires: expires() });
  return primaryColor;
};
const setDefaultRadiusCookie = (defaultRadius: MantineSize, options: OptionsType = {}) => {
  setCookie(COOKIE_NAME.defaultRadius, defaultRadius, { ...options, expires: expires() });
  return defaultRadius;
};
const getColorSchemeCookie = (options: OptionsType) => {
  const value = getCookie(COOKIE_NAME.colorScheme, options);
  return isValidColorScheme(value) ? value : undefined;
};
const getPrimaryColorCookie = (options: OptionsType) => {
  const value = getCookie(COOKIE_NAME.primaryColor, options);
  return isValidPrimaryColor(value) ? value : undefined;
};
const getDefaultRadiusCookie = (options: OptionsType) => {
  const value = getCookie(COOKIE_NAME.defaultRadius, options);
  return isValidDefaultRadius(value) ? value : undefined;
};
const deleteColorSchemeCookie = (options: OptionsType) => deleteCookie(COOKIE_NAME.colorScheme, options);
const deletePrimaryColorCookie = (options: OptionsType) => deleteCookie(COOKIE_NAME.primaryColor, options);
const deleteDefaultRadiusCookie = (options: OptionsType) => deleteCookie(COOKIE_NAME.defaultRadius, options);
function clearCookie(options: OptionsType) {
  deleteColorSchemeCookie(options);
  deletePrimaryColorCookie(options);
  deleteDefaultRadiusCookie(options);
}

type ThemeStoreState = ThemeSystemState;
type ThemeStoreAction = {
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme?: ColorScheme | (string & {})) => void;
  setPrimaryColor: (primaryColor?: MantineColor | (string & {})) => void;
  setDefaultRadius: (defaultRadius?: MantineSize | (string & {})) => void;
  setState: (state: Partial<ThemeStoreState>) => void;
};
type ThemeStoreType = ThemeStoreState & ThemeStoreAction;
type CreateThemeStoreOptions = Partial<ThemeSystemState>;
const createThemeStore = (options: CreateThemeStoreOptions = {}) => {
  const { colorScheme, primaryColor, defaultRadius } = options;

  return createStore<ThemeStoreType>()(
    withDevtools(
      (set, get) =>
        ({
          colorScheme: colorScheme || DEFAULT_THEME_SYSTEM_VALUE.colorScheme,
          primaryColor: primaryColor || DEFAULT_THEME_SYSTEM_VALUE.primaryColor,
          defaultRadius: defaultRadius || DEFAULT_THEME_SYSTEM_VALUE.defaultRadius,
          toggleColorScheme: () => {
            const colorScheme = get().colorScheme === "dark" ? "light" : "dark";
            set({ colorScheme: setColorSchemeCookie(colorScheme) }, false, { type: "toggle-color-scheme" });
            THEME_STORE_CHANNEL.toggleColorScheme(colorScheme);
          },
          setColorScheme: (colorScheme) => {
            if (isValidColorScheme(colorScheme)) {
              set({ colorScheme: setColorSchemeCookie(colorScheme) }, false, { type: "set-color-scheme" });
              THEME_STORE_CHANNEL.setColorScheme(colorScheme);
            }
          },
          setPrimaryColor: (primaryColor) => {
            if (isValidPrimaryColor(primaryColor)) {
              set({ primaryColor: setPrimaryColorCookie(primaryColor) }, false, { type: "set-primary-color" });
              THEME_STORE_CHANNEL.setPrimaryColor(primaryColor);
            }
          },
          setDefaultRadius: (defaultRadius) => {
            if (isValidDefaultRadius(defaultRadius)) {
              set({ defaultRadius: setDefaultRadiusCookie(defaultRadius) }, false, { type: "set-default-radius" });
              THEME_STORE_CHANNEL.setDefaultRadius(defaultRadius);
            }
          },
          setState: ({ colorScheme, primaryColor, defaultRadius }) => {
            let state: Partial<ThemeStoreState> = {};

            if (isValidColorScheme(colorScheme)) state.colorScheme = setColorSchemeCookie(colorScheme);
            if (isValidPrimaryColor(primaryColor)) state.primaryColor = setPrimaryColorCookie(primaryColor);
            if (isValidDefaultRadius(defaultRadius)) state.defaultRadius = setDefaultRadiusCookie(defaultRadius);

            set(state, false, { type: "set-state" });
          },
        } as ThemeStoreType),
      { name: NAME }
    )
  );
};

const ThemeStoreContext = createContext<StoreApi<ThemeStoreType>>({} as any);
const ThemeStoreProvider = ({ colorScheme, primaryColor, defaultRadius, children }: PropsWithChildren<Partial<ThemeSystemState>>) => {
  return (
    <ThemeStoreContext.Provider
      value={useMemo(() => createThemeStore({ colorScheme, primaryColor, defaultRadius }), [colorScheme, primaryColor, defaultRadius])}
    >
      {children}
    </ThemeStoreContext.Provider>
  );
};

const useThemeStore = createBoundedUseContextStore(ThemeStoreContext);

const colorSchemeSelector = ({ colorScheme, setColorScheme, toggleColorScheme }: ThemeStoreType) => ({
  colorScheme,
  setColorScheme,
  toggleColorScheme,
});
const primaryColorSelector = ({ primaryColor, setPrimaryColor }: ThemeStoreType) => ({
  primaryColor,
  setPrimaryColor,
});
const defaultRadiusSelector = ({ defaultRadius, setDefaultRadius }: ThemeStoreType) => ({
  defaultRadius,
  setDefaultRadius,
});

export type { ThemeStoreMessageData, ThemeStoreState, ThemeStoreAction, ThemeStoreType };
export { THEME_STORE_CHANNEL, getColorSchemeCookie, getPrimaryColorCookie, getDefaultRadiusCookie, clearCookie };
export { createThemeStore };
export { ThemeStoreProvider };
export { colorSchemeSelector, primaryColorSelector, defaultRadiusSelector };
export default useThemeStore;
