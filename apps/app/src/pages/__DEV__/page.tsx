import { Container, Title } from "@mantine/core";

import { ButtonLink } from "@unej-io/ui/react-router";

import { Head } from "~/components/core";

function DevPage() {
  return (
    <>
      <Head prefix="Dev" />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">DevPage</Title>

        <ButtonLink to="/dev/components">Components</ButtonLink>
        <ButtonLink to="/dev/tiptap">Tiptap</ButtonLink>
      </Container>
    </>
  );
}

export default DevPage;
