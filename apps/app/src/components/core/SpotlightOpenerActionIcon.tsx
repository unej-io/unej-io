import { forwardRef } from "react";

import { ActionIcon } from "@mantine/core";
import type { ActionIconProps } from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";

import { openSpotlight } from "@mantine/spotlight";

const handleClick = () => {
  openSpotlight();
};

const SpotlightOpenerActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(function ({ children, ...props }, ref) {
  return <ActionIcon ref={ref} {...props} onClick={handleClick} children={children ?? <IconSearch />} />;
});

export default SpotlightOpenerActionIcon;
