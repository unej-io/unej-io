import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const FormByIdPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="FormById" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          FormById
        </Title>
      </Container>
    </>
  );
};

export default FormByIdPage;
