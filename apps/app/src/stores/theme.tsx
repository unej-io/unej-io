import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BroadcastChannel } from "broadcast-channel";

import type { ColorScheme, MantineColor, MantineSize } from "@mantine/core";

import { DEFAULT_THEME_SYSTEM_VALUE, isValidColorScheme, isValidPrimaryColor, isValidDefaultRadius } from "@unej-io/ui/core";
import type { ThemeSystemState } from "@unej-io/ui/core";

import { withDevtools } from "./@utilities";

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

type ThemeStoreState = ThemeSystemState;
type ThemeStoreAction = {
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme?: ColorScheme | (string & {})) => void;
  setPrimaryColor: (primaryColor?: MantineColor | (string & {})) => void;
  setDefaultRadius: (defaultRadius?: MantineSize | (string & {})) => void;
};
type ThemeStoreType = ThemeStoreState & ThemeStoreAction;
const useThemeStore = create<ThemeStoreType>()(
  withDevtools(
    persist(
      (set, get) => ({
        ...DEFAULT_THEME_SYSTEM_VALUE,
        toggleColorScheme: () => {
          const colorScheme = get().colorScheme === "dark" ? "light" : "dark";
          set({ colorScheme }, false, { type: "toggle-color-scheme" });
          THEME_STORE_CHANNEL.toggleColorScheme(colorScheme);
        },
        setColorScheme: (colorScheme) => {
          if (isValidColorScheme(colorScheme)) {
            set({ colorScheme }, false, { type: "set-color-scheme" });
            THEME_STORE_CHANNEL.setColorScheme(colorScheme);
          }
        },
        setPrimaryColor: (primaryColor) => {
          if (isValidPrimaryColor(primaryColor)) {
            set({ primaryColor }, false, { type: "set-primary-color" });
            THEME_STORE_CHANNEL.setPrimaryColor(primaryColor);
          }
        },
        setDefaultRadius: (defaultRadius) => {
          if (isValidDefaultRadius(defaultRadius)) {
            set({ defaultRadius }, false, { type: "set-default-radius" });
            THEME_STORE_CHANNEL.setDefaultRadius(defaultRadius);
          }
        },
      }),
      {
        name: NAME,
        merge(persist, current) {
          function validatedPersistedState(persist: object) {
            let result: Partial<ThemeStoreState> = {};

            function setResult<K extends keyof ThemeStoreState>(key: K, check: (value: unknown) => value is ThemeStoreState[K]) {
              if (persist.hasOwnProperty(key) && check((persist as ThemeStoreState)[key])) result[key] = (persist as ThemeStoreState)[key];
            }

            setResult("colorScheme", isValidColorScheme);
            setResult("primaryColor", isValidPrimaryColor);
            setResult("defaultRadius", isValidDefaultRadius);

            return result;
          }

          return Object.assign({}, current, typeof persist === "object" && persist != null ? validatedPersistedState(persist) : {});
        },
      }
    ),
    {
      name: NAME,
    }
  )
);

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
export { THEME_STORE_CHANNEL };
export { colorSchemeSelector, primaryColorSelector, defaultRadiusSelector };
export default useThemeStore;
