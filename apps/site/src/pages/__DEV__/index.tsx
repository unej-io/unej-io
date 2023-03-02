import { Container, Title } from "@mantine/core";

import { ButtonLink } from "@unej-io/ui/next";

import { Head } from "~/components/core";

function DevPage() {
  return (
    <>
      <Head prefix="Dev" />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">DevPage</Title>

        <ButtonLink href="/dev/components">Components</ButtonLink>
        <ButtonLink href="/dev/tiptap">Tiptap</ButtonLink>
      </Container>
    </>
  );
}

export default DevPage;
