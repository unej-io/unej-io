import { forwardRef } from "react";
import type { ReactNode, SVGProps } from "react";

import { createEmotionCache, DEFAULT_THEME, useMantineTheme } from "@mantine/core";
import { Alert, Center, Group, Loader } from "@mantine/core";
import type {
  ColorScheme,
  DefaultMantineColor,
  MantineColor,
  MantineGradient,
  MantineSize,
  MantineSizes,
  MantineThemeOverride,
} from "@mantine/core";
import type {
  AccordionProps,
  AlertProps,
  AvatarProps,
  CenterProps,
  CheckboxProps,
  ContainerProps,
  LoaderProps,
  PasswordInputProps,
} from "@mantine/core";

import {
  IconAlertCircle,
  IconCheck,
  IconChevronDown,
  IconCircleCheck,
  IconEye,
  IconEyeOff,
  IconMinus,
  IconUser,
} from "@tabler/icons-react";

const EMOTION_CACHE = createEmotionCache({ key: "io", speedy: true });

const createMantineSizes = (xs: string, sm: string, md: string, lg: string, xl: string): MantineSizes => ({ xs, sm, md, lg, xl });
const getDefaultGradient = (primaryColor: MantineColor): MantineGradient => ({
  from: DEFAULT_THEME.colors[primaryColor][6],
  to: DEFAULT_THEME.colors[primaryColor][4],
  deg: 45,
});

const CheckboxIcon = ({ indeterminate, className }: { indeterminate: boolean; className: string }) =>
  indeterminate ? <IconMinus className={className} /> : <IconCheck className={className} />;
const PasswordInputVisibilityToggleIcon = ({ reveal, size }: { reveal: boolean; size: number }) =>
  reveal ? <IconEyeOff size={size} /> : <IconEye size={size} />;

const breakpoints = createMantineSizes("36em", "48em", "64em", "80em", "96em");
const fontSizes = createMantineSizes("0.6rem", "0.8rem", "1rem", "1.2rem", "1.4rem");
const radius = createMantineSizes("0.125rem", "0.25rem", "0.5rem", "1rem", "2rem");
const spacing = createMantineSizes("0.6rem", "0.8rem", "1rem", "1.25rem", "1.5rem");

const components: MantineThemeOverride["components"] = {
  Accordion: {
    defaultProps: {
      chevron: <IconChevronDown size={20} />,
    } as AccordionProps,
  },
  Avatar: {
    defaultProps: {
      children: <IconUser width="75%" height="75%" />,
    } as AvatarProps,
  },
  Checkbox: {
    defaultProps: {
      icon: CheckboxIcon,
    } as CheckboxProps,
  },
  Container: {
    defaultProps: {
      size: "xl",
    } as ContainerProps,
  },
  PasswordInput: {
    defaultProps: {
      visibilityToggleIcon: PasswordInputVisibilityToggleIcon,
    } as PasswordInputProps,
  },
};

const overrides: MantineThemeOverride = {
  components,
  breakpoints,
  fontSizes,
  radius,
  spacing,
  fontFamily: "Nunito, sans-serif",
  fontFamilyMonospace: "monospace",
  headings: {
    fontFamily: "Open Sans, sans-serif",
  },
  cursorType: "pointer",
  activeStyles: {
    transform: "scale(0.98)",
  },
};

type CreateThemeOptions = {
  colorScheme: ColorScheme;
  primaryColor: MantineColor;
  defaultRadius: MantineSize;
};

function createTheme(
  { colorScheme, primaryColor, defaultRadius }: CreateThemeOptions,
  override: MantineThemeOverride = {}
): MantineThemeOverride {
  return {
    ...overrides,
    colorScheme,
    primaryColor,
    defaultRadius,
    defaultGradient: getDefaultGradient(primaryColor),
    ...override,
  } as MantineThemeOverride;
}

const colorSchemes: ColorScheme[] = ["light", "dark"];
const primaryColors: MantineColor[] = ["red", "orange", "yellow", "green", "blue", "indigo", "grape", "gray"];
const radii: MantineSize[] = ["sm", "md", "lg"];

type ThemeSystemState = {
  colorScheme: ColorScheme;
  primaryColor: MantineColor;
  defaultRadius: MantineSize;
};

const DEFAULT_THEME_SYSTEM_VALUE: ThemeSystemState = {
  colorScheme: "light",
  primaryColor: "indigo",
  defaultRadius: "md",
};

const isString = (value: unknown): value is string => typeof value === "string";
const isValidColorScheme = (value: unknown): value is ColorScheme => isString(value) && colorSchemes.includes(value as any);
const isValidPrimaryColor = (value: unknown): value is MantineColor => isString(value) && primaryColors.includes(value as any);
const isValidDefaultRadius = (value: unknown): value is MantineSize => isString(value) && radii.includes(value as any);

function CenterLoader({ loader, ...rest }: Omit<CenterProps, "children"> & { loader?: Omit<LoaderProps, "children"> }) {
  return <Center {...rest} children={<Loader {...loader} />} />;
}

const Logo = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & { primary?: boolean }>(function ({ primary = false, ...rest }, ref) {
  const theme = useMantineTheme();

  return (
    <svg ref={ref} {...rest} version="1.1" viewBox="0 0 203.2 84.667" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          d="m132.37 42.339c0-4.253 3.4239-7.6769 7.6769-7.6769h15.354c4.253 0 7.6769 3.4239 7.6769 7.6769 0 4.253-3.4239 7.6769-7.6769 7.6769h-15.354c-4.253 0-7.6769-3.4239-7.6769-7.6769zm-30.708-30.708c0-4.253 3.4239-7.6769 7.6769-7.6769h46.061c4.253 0 7.6769 3.4239 7.6769 7.6769 0 4.253-3.4239 7.6769-7.6769 7.6769h-46.061c-4.253 0-7.6769-3.4239-7.6769-7.6769zm-41.658-4.6139c3.4111-2.5402 8.2022-1.8391 10.742 1.5719l43.437 58.329c2.5402 3.4111 1.8391 8.2022-1.5719 10.742-3.4111 2.5402-8.2022 1.8391-10.742-1.5719l-43.437-58.329c-2.5402-3.4111-1.8391-8.2022 1.5719-10.742zm49.335-3.063c4.253 0 7.6769 3.4239 7.6769 7.6769v61.415c0 4.253-3.4239 7.6769-7.6769 7.6769-4.253 0-7.6769-3.4239-7.6769-7.6769v-61.415c0-4.253 3.4239-7.6769 7.6769-7.6769zm-46.061 1.56e-5c4.253 0 7.6769 3.4239 7.6769 7.6769v15.354c0 4.253-3.4239 7.6769-7.6769 7.6769-4.253 0-7.6769-3.4239-7.6769-7.6769v-15.354c0-4.253 3.4239-7.6769 7.6769-7.6769zm115.15 53.738v-15.354h15.354v15.354zm-23.031 23.031v-15.354h15.354v15.354zm38.385-23.031h-15.354c0 4.253-3.4239 7.6769-7.6769 7.6769v15.354c12.759 0 23.031-10.272 23.031-23.031zm-7.6769-53.738c4.253 0 7.6769 3.4239 7.6769 7.6769v38.385c0 4.253-3.4239 7.6769-7.6769 7.6769-4.253 0-7.6769-3.4239-7.6769-7.6769v-38.385c0-4.253 3.4239-7.6769 7.6769-7.6769zm-38.385 69.092c0-4.253 3.4239-7.6769 7.6769-7.6769h7.6769c4.253 0 7.6769 3.4239 7.6769 7.6769 0 4.253-3.4239 7.6769-7.6769 7.6769h-7.6769c-4.253 0-7.6769-3.4239-7.6769-7.6769zm-15.354 0c0-4.253 3.4239-7.6769 7.6769-7.6769h15.354c4.253 0 7.6769 3.4239 7.6769 7.6769 0 4.253-3.4239 7.6769-7.6769 7.6769h-15.354c-4.253 0-7.6769-3.4239-7.6769-7.6769zm-76.89-15.365h15.354c0-4.253-3.4239-7.6769-7.6769-7.6769-4.253 0-7.6769 3.4239-7.6769 7.6769zm-46.061-4e-6v-15.354h15.354v15.354zm23.031 23.031v-15.354h15.354v15.354zm38.385-23.031h-15.354c0 4.253-3.4239 7.6769-7.6769 7.6769v15.354c12.759 0 23.031-10.272 23.031-23.031zm-38.385 23.031v-15.354c-4.253 0-7.6769-3.4239-7.6769-7.6769h-15.354c0 12.759 10.272 23.031 23.031 23.031zm-15.354-76.769c4.253 0 7.6769 3.4239 7.6769 7.6769v38.385c0 4.253-3.4239 7.6769-7.6769 7.6769-4.253 0-7.6769-3.4239-7.6769-7.6769v-38.385c0-4.253 3.4239-7.6769 7.6769-7.6769z"
          fill={
            theme.colorScheme === "dark"
              ? primary
                ? theme.colors[theme.primaryColor][5]
                : theme.colors.gray[0]
              : theme.colors[theme.primaryColor][6]
          }
        />
      </g>
    </svg>
  );
});

function LogoLoader({ height = 32, primary = true }: { height?: number; primary?: boolean }) {
  return (
    <Group spacing="md">
      <Loader variant="dots" />
      <Logo height={height} primary={primary} />
      <Loader variant="dots" />
    </Group>
  );
}

const createSimpleAlert = (color: DefaultMantineColor, icon?: ReactNode) => {
  return ({ message, ...rest }: Omit<AlertProps, "children"> & { message: string }) => (
    <Alert color={color} icon={icon} {...rest} children={message} />
  );
};

const ErrorAlert = createSimpleAlert("red", <IconAlertCircle />);
const InfoAlert = createSimpleAlert("blue", <IconAlertCircle />);
const SuccessAlert = createSimpleAlert("green", <IconCircleCheck />);
const WarningAlert = createSimpleAlert("yellow", <IconAlertCircle />);

export type { CreateThemeOptions, ThemeSystemState };

export { EMOTION_CACHE };
export { createTheme, colorSchemes, primaryColors, radii, DEFAULT_THEME_SYSTEM_VALUE };
export { isValidColorScheme, isValidPrimaryColor, isValidDefaultRadius };
export { CenterLoader, Logo, LogoLoader, ErrorAlert, InfoAlert, SuccessAlert, WarningAlert };
