import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const LinkByUsernamePage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="LinkByUsername" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          LinkByUsername
        </Title>
      </Container>
    </>
  );
};

export default LinkByUsernamePage;
