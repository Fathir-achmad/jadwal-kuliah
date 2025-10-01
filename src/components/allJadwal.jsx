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
  const allMeetings = schedule.flatMap((cls) =>
    cls.meetings.map((m) => ({
      subject: cls.subject,
      lecturer: cls.lecturer,
      day: cls.day,
      time: cls.time,
      ...m,
    }))
  );

  const sortedMeetings = allMeetings.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const pageSize = 9;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(sortedMeetings.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedMeetings = sortedMeetings.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
  <Box w="100%" maxW="800px" mx="auto">
      {/* Scrollable Table */}
      <TableContainer
        maxH="60vh"
        overflowY="auto"
        overflowX="auto" // scroll horizontal untuk layar kecil
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
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
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
    </Box>
  );
};
