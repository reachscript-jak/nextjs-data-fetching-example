import Link from "next/link";
import { Flex, Stack } from "@chakra-ui/react";

const Index = () => {
  return (
    <Flex justify="center" align="center" h="100vh">
      <Stack direction="column" fontSize="2xl" color="blue.500">
        <Link href="/csr">
          <a>CSR</a>
        </Link>
        <Link href="/ssr">
          <a>SSR</a>
        </Link>
        <Link href="/ssg">
          <a>SSG</a>
        </Link>
        <Link href="/isr">
          <a>ISR</a>
        </Link>
      </Stack>
    </Flex>
  );
};

export default Index;
