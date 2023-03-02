import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const FormPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="Form" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Form
        </Title>
      </Container>
    </>
  );
};

export default FormPage;
