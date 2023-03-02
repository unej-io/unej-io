import { forwardRef } from "react";

import { Badge } from "@mantine/core";
import type { BadgeProps } from "@mantine/core";

const AppStatusBadge =
  typeof process.env.NEXT_PUBLIC_STATUS === "string"
    ? forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
        return <Badge ref={ref} {...props} children={process.env.NEXT_PUBLIC_STATUS} />;
      })
    : () => null;

export default AppStatusBadge;
