import { GetStaticProps, NextPage } from "next";
import { Box, Flex, Stack, Tag, Text } from "@chakra-ui/react";

import { supabase } from "../../utils/supabaseClient";
import { Hero } from "../../components/Hero";

type ContentTable = {
  id: number;
  version: number;
  content: string;
};

// fallback: falseのパターン
const SsgId: NextPage<ContentTable> = (props) => {
  const content = {
    id: `${props.id}`,
    version: `${props.version}`,
    contents: props.content.split("/"),
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

export async function getStaticPaths() {
  const { data, error, status } = await supabase
    .from("contents")
    .select("*")
    .order("id");

  const paths = data?.map((content) => ({
    params: { id: `${content.id}` },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, error, status } = await supabase
    .from<ContentTable>("contents")
    .select("*")
    .eq("id", `${params.id}`)
    .single();

  return {
    props: data,
  };
};

export default SsgId;
