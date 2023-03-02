import { Button, Container, Title } from "@mantine/core";

import { ColorSchemeTogglerSwitch, DefaultRadiusSelectGroup, Head, PrimaryColorSelectGroup, ThemeStaticProvider } from "~/components/core";

function SignInPage() {
  return (
    <>
      <Head prefix="Sign In" />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">SignInPage</Title>

        <Button>Button</Button>

        <PrimaryColorSelectGroup />

        <ColorSchemeTogglerSwitch />

        <DefaultRadiusSelectGroup />
      </Container>

      <div>
        <ThemeStaticProvider primaryColor="lime" defaultRadius="md">
          <Container size="xs" my="xl" p="xl">
            <Title align="center">ThemeStaticProvider</Title>

            <Button>Button</Button>

            <PrimaryColorSelectGroup />

            <ColorSchemeTogglerSwitch />

            <DefaultRadiusSelectGroup />
          </Container>
        </ThemeStaticProvider>
      </div>
    </>
  );
}

export default SignInPage;
