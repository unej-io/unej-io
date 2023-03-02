import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";

const FeedbackPage: NextPageWithLayout = () => {
  return (
    <>
      <Head prefix="Feedback" />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Feedback
        </Title>
      </Container>
    </>
  );
};

export default FeedbackPage;
