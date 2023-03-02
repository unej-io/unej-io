import { createStyles } from "@mantine/core";

const useSharedStyles = createStyles((theme) => ({
  blurBackground: {
    backgroundColor: theme.fn.rgba(theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white, 0.7),
    backdropFilter: "blur(4px)",
  },

  flexCenter: { display: "flex", justifyContent: "center", alignItems: "center" },

  fullWidth: { width: "100%" },
  fullHeight: { height: "100%" },
  fullSize: { width: "100%", height: "100%" },

  flexGrow: { flexGrow: 1 },
  flexNoGrow: { flexGrow: 0 },
  flexShrink: { flexShrink: 1 },
  flexNoShrink: { flexShrink: 0 },

  logo: {
    height: 22,
    [theme.fn.largerThan("sm")]: { height: 28 },
    [theme.fn.largerThan("md")]: { height: 32 },
  },
  logoSmall: {
    height: 18,
    [theme.fn.largerThan("sm")]: { height: 24 },
    [theme.fn.largerThan("md")]: { height: 28 },
  },
}));

export default useSharedStyles;
