import { forwardRef, memo } from "react";

import { Button, Group } from "@mantine/core";
import type { GroupProps } from "@mantine/core";

import { radii } from "@unej-io/ui/core";

import useThemeStore, { defaultRadiusSelector } from "~/stores/theme";

const DefaultRadiusSelectGroup = forwardRef<HTMLDivElement, GroupProps>(function (props, ref) {
  const { defaultRadius, setDefaultRadius } = useThemeStore(defaultRadiusSelector);

  return (
    <Group ref={ref} {...props}>
      {radii.map((radi) => (
        <Button
          key={radi}
          size="md"
          radius={radi}
          variant={defaultRadius === radi ? "filled" : "outline"}
          onClick={() => {
            setDefaultRadius(radi);
          }}
        >
          {radi}
        </Button>
      ))}
    </Group>
  );
});

export default memo(DefaultRadiusSelectGroup);
