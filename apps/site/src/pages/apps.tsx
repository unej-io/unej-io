import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const AppsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="Apps" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Apps
        </Title>
      </Container>
    </>
  );
};

export default AppsPage;
