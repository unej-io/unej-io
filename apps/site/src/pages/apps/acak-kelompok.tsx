import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const AcakKelompokPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="AcakKelompok" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          AcakKelompok
        </Title>
      </Container>
    </>
  );
};

export default AcakKelompokPage;
