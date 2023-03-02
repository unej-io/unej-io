import { Container, createStyles, Text, Title } from "@mantine/core";

import { Head } from "~/components/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: 32,
    paddingBottom: 32,
  },

  background: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    display: "flex",
    justifyContent: "center",
    paddingTop: 16,
    opacity: 0.75,
    overflow: "hidden",
  },

  ["404"]: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
    fontSize: `calc(${theme.fontSizes.xl} * 24)`,
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: `calc(${theme.fontSizes.xl} * 12)`,
    },
  },

  foreground: {
    paddingTop: 220,
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: 120,
    },
  },

  title: {
    textAlign: "center",
    fontSize: `calc(${theme.fontSizes.xl} * 2)`,
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: `calc(${theme.fontSizes.xl} * 1)`,
    },
  },
}));

function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <>
      <Head prefix="Not Found" />

      <Container className={classes.root}>
        <div className={classes.background}>
          <Text className={classes[404]}>404</Text>
        </div>
        <div className={classes.foreground}>
          <Title className={classes.title}>Sorry, we couldn't find that page.</Title>
        </div>
      </Container>
    </>
  );
}

export default NotFoundPage;
