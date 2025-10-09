import { useState, useEffect } from "react";
import { Box, Text, Progress, Flex } from "@chakra-ui/react";
import { schedule } from "../helper/schedule";

export const ProgressKuliah = () => {
  const [progress, setProgress] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const now = new Date();
    let total = 0;
    let done = 0;

    schedule.forEach((course) => {
      course.meetings.forEach((m) => {
        total++;

        const mDate = new Date(m.date);
        const [startStr, endStr] = m.time.split(" - ");
        const [eh, em] = endStr.split(".").map(Number);
        const endTime = new Date(mDate);
        endTime.setHours(eh, em, 0, 0);

        if (endTime < now) done++;
      });
    });

    setTotalCount(total);
    setDoneCount(done);
    setProgress(((done / total) * 100).toFixed(1));

    // update otomatis tiap menit
    const interval = setInterval(() => {
      const current = new Date();
      let updatedDone = 0;
      schedule.forEach((course) => {
        course.meetings.forEach((m) => {
          const mDate = new Date(m.date);
          const [startStr, endStr] = m.time.split(" - ");
          const [eh, em] = endStr.split(".").map(Number);
          const endTime = new Date(mDate);
          endTime.setHours(eh, em, 0, 0);
          if (endTime < current) updatedDone++;
        });
      });
      setDoneCount(updatedDone);
      setProgress(((updatedDone / total) * 100).toFixed(1));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      bg="gray.800"
      color="white"
      p={5}
      rounded="md"
      shadow="md"
      w="100%"
      maxW="700px"
      mx="auto"
      mt={6}
    >
      <Text fontWeight="bold" fontSize="xl" mb={2} textAlign="center">
        Progress Perkuliahan
      </Text>

      <Progress
        value={progress}
        size="lg"
        colorScheme="blue"
        borderRadius="md"
        mb={2}
      />

      <Flex justify="space-between" fontSize="sm" color="gray.300">
        <Text>{doneCount} dari {totalCount} pertemuan</Text>
        <Text>{progress}% selesai</Text>
      </Flex>
    </Box>
  );
};
