import { forwardRef, memo } from "react";

import { ActionIcon, Group } from "@mantine/core";
import type { GroupProps } from "@mantine/core";

import { primaryColors } from "@unej-io/ui/core";

import useThemeStore, { primaryColorSelector } from "~/stores/theme";

const PrimaryColorSelectGroup = forwardRef<HTMLDivElement, GroupProps>(function (props, ref) {
  const { primaryColor, setPrimaryColor } = useThemeStore(primaryColorSelector);

  return (
    <Group ref={ref} {...props}>
      {primaryColors.map((color) => {
        return (
          <ActionIcon
            key={color}
            size="md"
            color={color}
            title={color}
            radius="xl"
            variant={primaryColor === color ? "filled" : "outline"}
            onClick={() => {
              setPrimaryColor(color);
            }}
            {...(primaryColor === color ? { ["data-autofocus"]: true } : {})}
          />
        );
      })}
    </Group>
  );
});

export default memo(PrimaryColorSelectGroup);
