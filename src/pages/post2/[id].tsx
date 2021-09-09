import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Flex, Spinner, Stack, Tag, Text } from "@chakra-ui/react";

import { supabase } from "../../utils/supabaseClient";
import { Hero } from "../../components/Hero";

type ContentTable = {
  id: number;
  version: number;
  content: string;
};

// fallback: trueのパターン
const SsgId: NextPage<ContentTable> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Flex justify="center" align="center" direction="column">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Flex>
    );
  }

  const content = {
    id: `${props.id}`,
    version: `${props.version}`,
    contents: props.content?.split("/"),
  };
  return (
    <Flex justify="center" align="center" direction="column">
      <Hero title={content.version} />
      <Text fontSize="2xl">id : {content.id}</Text>
      <Stack spacing={4} mt={6}>
        {content.contents?.map((poke) => (
          <Box key={poke}>
            <Tag color="teal.600" py={4} px={8} fontWeight="bold" size="2xl">
              {poke}
            </Tag>
          </Box>
        ))}
      </Stack>
    </Flex>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error, status } = await supabase
    .from("contents")
    .select("*")
    .order("id");

  const paths = data?.map((content) => ({
    params: { id: `${content.id}` },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, error, status } = await supabase
    .from<ContentTable>("contents")
    .select("*")
    .eq("id", `${params.id}`)
    .single();

  return {
    props: data,
    revalidate: 10,
  };
};

export default SsgId;
