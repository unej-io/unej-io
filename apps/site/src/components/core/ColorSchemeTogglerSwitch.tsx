import { forwardRef, memo } from "react";

import { Switch } from "@mantine/core";
import type { SwitchProps } from "@mantine/core";

import { IconMoon, IconSun } from "@tabler/icons-react";

import useThemeStore, { colorSchemeSelector } from "~/stores/theme";

const ColorSchemeTogglerSwitch = forwardRef<HTMLInputElement, Omit<SwitchProps, "checked" | "onChange">>(function (props, ref) {
  const { colorScheme, toggleColorScheme } = useThemeStore(colorSchemeSelector);

  return (
    <Switch
      ref={ref}
      size="lg"
      color={colorScheme === "dark" ? "gray" : "dark"}
      onLabel={<IconSun size={20} />}
      offLabel={<IconMoon size={20} />}
      aria-label="Toggle color scheme"
      {...props}
      checked={colorScheme === "dark"}
      onChange={toggleColorScheme}
    />
  );
});

export default memo(ColorSchemeTogglerSwitch);
