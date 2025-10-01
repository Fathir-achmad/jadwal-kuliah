import { Box, Center } from "@chakra-ui/react";
import { Clock } from "../components/clock";
import { NextClass } from "../components/jadwal";

export const HomePage = () => {
  return (
    <Box bgColor={"#27374D"} minH={"100vh"} p={4}>
      <Center>
        <Box
          w={{ base: "95%", sm: "90%", md: "600px", lg: "800px" }}
          p={{ base: 4, md: 6 }}
          borderRadius="lg"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Clock />
          <Box mt={6} w="100%">
            <NextClass />
          </Box>
        </Box>
      </Center>
    </Box>
  );
};
