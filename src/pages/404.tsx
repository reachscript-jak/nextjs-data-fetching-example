import { Alert, AlertIcon, AlertTitle, Flex } from "@chakra-ui/react";

const Page404 = () => {
  return (
    <Flex justify="center" align="center" h="100vh" maxW="md" mx="auto">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>存在しないページです</AlertTitle>
      </Alert>
    </Flex>
  );
};

export default Page404;
