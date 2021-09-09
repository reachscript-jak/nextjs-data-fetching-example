import Link from "next/link";
import { Divider, Flex, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const Index = () => {
  const [inputId, setInputId] = useState("");

  return (
    <Flex justify="center" align="center" h="100vh">
      <Stack direction="column" align="center" fontSize="2xl" color="blue.500">
        <Link href="/csr">
          <a>CSR</a>
        </Link>
        <Link href="/ssr">
          <a>SSR</a>
        </Link>
        <Link href="/ssg">
          <a>SSG</a>
        </Link>
        <Link href="/isr" prefetch={false}>
          <a>ISR</a>
        </Link>
        <Divider />
        <Input
          value={inputId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputId(e.target.value)
          }
        />
        <Link href={`/post/${inputId}`}>
          <a>↑のidで動的SSG(fallback: false)</a>
        </Link>
        <Link href={`/post2/${inputId}`} prefetch={false}>
          <a>↑のidで動的SSG(fallback: true)</a>
        </Link>
        <Link href={`/post3/${inputId}`} prefetch={false}>
          <a>↑のidで動的SSG(fallback: blocking, revalidate)</a>
        </Link>
      </Stack>
    </Flex>
  );
};

export default Index;
