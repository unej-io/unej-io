import { forwardRef } from "react";

import { Badge } from "@mantine/core";
import type { BadgeProps } from "@mantine/core";

const AppStatusBadge =
  typeof import.meta.env.VITE_STATUS === "string"
    ? forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
        return <Badge ref={ref} {...props} children={import.meta.env.VITE_STATUS} />;
      })
    : () => null;

export default AppStatusBadge;
