import { useState, useEffect } from "react";
import { Box, Text, Divider, Flex, Badge } from "@chakra-ui/react";
import { schedule } from "../helper/schedule";

const colors = ["teal.500", "purple.500", "orange.500", "pink.500", "cyan.500", "yellow.500", "blue.500"];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export const NextClass = () => {
  const [nextDateClasses, setNextDateClasses] = useState([]);

  useEffect(() => {
    const today = new Date();
    const upcoming = [];

    schedule.forEach((course) => {
      course.meetings.forEach((m) => {
        const mDate = new Date(m.date);
        if (mDate >= today) {
          upcoming.push({
            ...course,
            meetingLabel: m.label,
            meetingDate: mDate,
            mode: m.mode,
            time: course.time,
            day: course.day,
          });
        }
      });
    });

    upcoming.sort((a, b) => a.meetingDate - b.meetingDate);

    if (upcoming.length > 0) {
      const nearestDate = upcoming[0].meetingDate.toDateString();
      const sameDayClasses = upcoming.filter(
        (c) => c.meetingDate.toDateString() === nearestDate
      );
      setNextDateClasses(sameDayClasses);
    }
  }, []);

  if (nextDateClasses.length === 0) {
    return (
      <Box p={6} rounded="md" bg="gray.700" color="white" textAlign="center">
        <Text>Tidak ada jadwal kuliah berikutnya 🎉</Text>
      </Box>
    );
  }

  const dateText = nextDateClasses[0].meetingDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      p={{ base: 4, md: 6 }}
      rounded="md"
      bg="blue.700"
      color="white"
      boxShadow="lg"
      w="100%"
    >
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" textAlign="center">
        Jadwal Kuliah Berikutnya
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} textAlign="center">
        {dateText}
      </Text>
      <Divider my={4} />

      <Flex wrap="wrap" justify="center" gap={4}>
        {nextDateClasses.map((cls, idx) => (
          <Box
            key={idx}
            p={4}
            w={{ base: "100%", sm: "90%", md: "500px" }}
            bg={getRandomColor()}
            rounded="md"
            boxShadow="md"
          >
            <Flex direction="row" justify="space-between" align="flex-start">
              {/* Kiri: Detail kelas */}
              <Box>
                <Text fontWeight="bold" mb={2}>
                  {cls.subject}
                </Text>
                <Text fontSize="sm">Dosen: {cls.lecturer}</Text>
                {/* <Text fontSize="sm">Hari: {cls.day}</Text> */}
                <Text fontSize="sm">
                  Tanggal: {cls.meetingDate.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Text fontSize="sm">Jam: {cls.time}</Text>
                <Text fontSize="sm">Pertemuan: {cls.meetingLabel}</Text>
              </Box>

              {/* Kanan: Badge mode */}
              <Badge
                colorScheme={cls.mode === "offline" ? "red" : "green"}
                fontSize={{ base: "0.7em", md: "0.9em" }}
                ml={4}
              >
                {cls.mode === "offline" ? "Offline" : "Online"}
              </Badge>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
