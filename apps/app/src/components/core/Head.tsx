import { memo } from "react";

import { useDocumentTitle } from "@mantine/hooks";

import { APP } from "~/const/app";

function getTitle(prefix?: string, suffix?: string) {
  let title = APP.name;
  if (typeof prefix === "string") title = `${prefix} - ${title}`;
  if (typeof suffix === "string") title = `${title} - ${suffix}`;
  return title.trim();
}

function Head(props: { prefix?: string; suffix?: string }) {
  useDocumentTitle(getTitle(props.prefix, props.suffix));

  return null;
}

export default memo(Head);
