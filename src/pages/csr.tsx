import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Flex, Stack, Tag, Text } from "@chakra-ui/react";

import { supabase } from "../utils/supabaseClient";
import { Hero } from "../components/Hero";

type ContentTable = {
  id: number;
  version: number;
  content: string;
};

type ContentState = {
  id: string;
  version: string;
  contents: Array<string>;
};

const Csr: NextPage = () => {
  const [content, setContent] = useState<ContentState>({
    id: "",
    version: "",
    contents: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error, status } = await supabase
        .from<ContentTable>("contents")
        .select("*")
        .eq("id", 1)
        .single();

      if (!error)
        setContent({
          id: `${data.id}`,
          version: `${data.version}`,
          contents: data.content.split("/"),
        });
    };
    fetchData();
  }, []);

  return (
    <Flex justify="center" align="center" direction="column">
      <Hero title={content.version} />
      <Text fontSize="2xl">id : {content.id}</Text>
      <Stack spacing={4} mt={6}>
        {content.contents.map((poke) => (
          <Box>
            <Tag color="teal.600" py={4} px={8} fontWeight="bold" size="2xl">
              {poke}
            </Tag>
          </Box>
        ))}
      </Stack>
    </Flex>
  );
};

export default Csr;
