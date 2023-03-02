import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

function NotFoundPage() {
  return (
    <>
      <Head prefix="Not Found" />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">NotFoundPage</Title>
      </Container>
    </>
  );
}

export default NotFoundPage;
