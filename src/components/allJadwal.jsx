import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  HStack,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { schedule } from "../helper/schedule";

export const ScheduleTable = () => {
  // Gabungkan semua jadwal dari tiap mata kuliah
  const allMeetings = schedule.flatMap((cls) =>
    cls.meetings.map((m) => ({
      subject: cls.subject,
      lecturer: cls.lecturer,
      day: m.day,
      time: m.time,
      ...m,
    }))
  );

  // Sort berdasarkan tanggal
  const sortedMeetings = allMeetings.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Filter: hanya tampilkan jadwal dari hari ini ke depan
  const today = new Date();
  const upcomingMeetings = sortedMeetings.filter((m) => {
    const meetingDate = new Date(m.date);
    // Hilangkan jadwal jika tanggalnya sudah lewat (tanpa mempertimbangkan jam)
    return meetingDate >= new Date(today.toDateString());
  });

  // Pagination
  const pageSize = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(upcomingMeetings.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedMeetings = upcomingMeetings.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <Box w="100%" maxW="800px" mx="auto">
      {/* Scrollable Table */}
      <TableContainer
        maxH="60vh"
        overflowY="auto"
        overflowX="auto"
        bg="white"
        borderRadius="md"
        p={1}
        w="100%"
      >
        <Table variant="striped" colorScheme="blue" size="sm" w="100%">
          <Thead bg="blue.600">
            <Tr>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Tanggal
              </Th>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Hari
              </Th>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Jam
              </Th>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Mata Kuliah
              </Th>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Dosen
              </Th>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Pertemuan
              </Th>
              <Th color="white" fontSize="lg" fontWeight="bold" py={4}>
                Mode
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedMeetings.map((cls, idx) => (
              <Tr key={`${cls.subject}-${cls.label}-${idx}`}>
                <Td>
                  {new Date(cls.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Td>
                <Td>{cls.day}</Td>
                <Td>{cls.time}</Td>
                <Td fontWeight="bold">{cls.subject}</Td>
                <Td>{cls.lecturer}</Td>
                <Td>{cls.label}</Td>
                <Td>
                  <Badge
                    colorScheme={cls.mode === "online" ? "green" : "red"}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {cls.mode.toUpperCase()}
                  </Badge>
                </Td>
              </Tr>
            ))}

            {/* Jika semua jadwal sudah lewat */}
            {paginatedMeetings.length === 0 && (
              <Tr>
                <Td colSpan={7} textAlign="center" py={6}>
                  <Text fontWeight="bold" color="gray.600">
                    Tidak ada jadwal yang akan datang 📅
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      {upcomingMeetings.length > 0 && (
        <HStack spacing={4} justify="center" mt={4}>
          <Button
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            isDisabled={page === 1}
          >
            Prev
          </Button>
          <Text color={"white"}>
            Page {page} of {totalPages}
          </Text>
          <Button
            size="sm"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            isDisabled={page === totalPages}
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
};
