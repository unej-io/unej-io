import type { ComponentType } from "react";

import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import { Anchor, Button, Paper, Text } from "@mantine/core";
import type { AnchorProps, ButtonProps, PaperProps, TextProps } from "@mantine/core";

function createLink<P>(Component: ComponentType<{ component?: any }>) {
  return (props: P & Omit<LinkProps, keyof P>) => <Component {...(props as any)} component={Link} />;
}

const AnchorLink = createLink<AnchorProps>(Anchor);
const ButtonLink = createLink<ButtonProps>(Button);
const PaperLink = createLink<PaperProps>(Paper);
const TextLink = createLink<TextProps>(Text);

export { AnchorLink, ButtonLink, PaperLink, TextLink };
