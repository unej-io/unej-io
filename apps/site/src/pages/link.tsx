import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const LinkPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="Link" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Link
        </Title>
      </Container>
    </>
  );
};

export default LinkPage;
