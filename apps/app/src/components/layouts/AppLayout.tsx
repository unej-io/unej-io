import { Suspense, useEffect, useRef } from "react";

import { Outlet } from "react-router-dom";

import { ActionIcon, Anchor, Box, Center, Container, Drawer, Group, Navbar, ScrollArea, Text } from "@mantine/core";
import type {} from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";

import { CenterLoader, Logo } from "@unej-io/ui/core";

import { IconMenu2 } from "@tabler/icons-react";

import { APP } from "~/const/app";

import { history, AppStatusBadge, SpotlightOpenerActionIcon } from "~/components/core";
import { useSharedStyles } from "~/hooks/core";

const HEADER_HEIGHT = 64;

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    transition: "box-shadow 150ms",
    zIndex: 1,
  },

  headerShadow: {
    boxShadow: theme.shadows.md,
  },

  logo: {
    height: 22,

    [theme.fn.largerThan("sm")]: {
      height: 28,
    },

    [theme.fn.largerThan("md")]: {
      height: 32,
    },
  },

  header__menu_action: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },

  header__links_group: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  header__auth_actions_group: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  drawer__navbar: {
    border: "none",
  },

  main: {
    position: "relative",
    marginTop: HEADER_HEIGHT,
    minHeight: "80vh",
    zIndex: 0,
  },

  footer: {
    position: "relative",
    zIndex: 0,
  },
}));

function AppLayout() {
  const { classes: sharedClasses } = useSharedStyles();
  const { classes, cx, theme } = useStyles();

  const [scroll] = useWindowScroll();
  const [drawer, drawerHandle] = useDisclosure(false);

  const matchesLargerThanMedium = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);
  const currentMatchesLargerThanMedium = useRef(matchesLargerThanMedium);

  useEffect(
    () =>
      history.listen(() => {
        setTimeout(drawerHandle.close, 150);
      }),
    []
  );

  useEffect(() => {
    if (matchesLargerThanMedium !== currentMatchesLargerThanMedium.current) {
      drawerHandle.close();
      currentMatchesLargerThanMedium.current = matchesLargerThanMedium;
    }
  }, [matchesLargerThanMedium]);

  return (
    <>
      <header className={cx(classes.header, scroll.y > 10 && classes.headerShadow, sharedClasses.blurredBackground)}>
        <Container fluid px="xl" className={sharedClasses.fullHeight}>
          <Group align="center" spacing="xl" className={sharedClasses.fullHeight}>
            <ActionIcon mr="sm" onClick={drawerHandle.open} className={classes.header__menu_action}>
              <IconMenu2 />
            </ActionIcon>

            <Anchor href="/" variant="text" className={sharedClasses.flexCenter}>
              <Logo className={classes.logo} />
            </Anchor>

            <AppStatusBadge variant="outline" size="lg" />

            <Box sx={{ flexGrow: 1 }} />

            <Group>
              <SpotlightOpenerActionIcon aria-label="app search" />
            </Group>

            {/* <AuthLinksGroup className={classes.header__auth_actions_group} /> */}
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawer}
        onClose={drawerHandle.close}
        title={
          <Anchor href="/" variant="text" className={sharedClasses.flexCenter}>
            <Logo className={classes.logo} />
          </Anchor>
        }
        padding="xl"
        size="lg"
        overlayProps={{
          opacity: 0.3,
          blur: 3,
        }}
      >
        <Navbar py="sm" className={classes.drawer__navbar} height="100%">
          <Navbar.Section>
            <DrawerAuthLinks />
          </Navbar.Section>

          <Navbar.Section grow component={ScrollArea} mx="-xs" py="sm" px="xs">
            <DrawerNavLinks />
          </Navbar.Section>
        </Navbar>
      </Drawer>

      <main className={classes.main}>
        <Container fluid px="xl">
          <Suspense fallback={<CenterLoader m="xl" />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>

      <footer className={classes.footer}>
        <Container fluid px="xl" pb="xl">
          <Center>
            <Text size="xs" color="dimmed">
              © 2022 - {APP.name}
            </Text>
          </Center>
        </Container>
      </footer>
    </>
  );
}

export default AppLayout;
