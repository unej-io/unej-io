import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

function SignUpPage() {
  return (
    <>
      <Head prefix="Sign Up" />

      <Container size="xs" my="xl" p="xl">
        <Title align="center">SignUpPage</Title>
      </Container>
    </>
  );
}

export default SignUpPage;
