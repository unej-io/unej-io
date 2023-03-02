import type { ComponentType } from "react";

import Link from "next/link";
import type { LinkProps } from "next/link";

import { Anchor, Button, Paper, Text } from "@mantine/core";
import type { AnchorProps, ButtonProps, PaperProps, TextProps } from "@mantine/core";
import { createGetInitialProps } from "@mantine/next";

import { EMOTION_CACHE } from "../core";

const GET_INITIAL_PROPS = createGetInitialProps(EMOTION_CACHE);

function createLink<P>(Component: ComponentType<{ component?: any }>) {
  return (props: P & Omit<LinkProps, keyof P>) => <Component {...(props as any)} component={Link} />;
}

const AnchorLink = createLink<AnchorProps>(Anchor);
const ButtonLink = createLink<ButtonProps>(Button);
const PaperLink = createLink<PaperProps>(Paper);
const TextLink = createLink<TextProps>(Text);

export { GET_INITIAL_PROPS };
export { AnchorLink, ButtonLink, PaperLink, TextLink };
