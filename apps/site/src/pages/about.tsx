import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="About" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          About
        </Title>
      </Container>
    </>
  );
};

export default AboutPage;
