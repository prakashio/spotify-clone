import { Box } from "@chakra-ui/layout";
import { IconButton, Table, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";
import { FiPlay, FiClock } from "react-icons/fi";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  return (
    <Box bg="transparent" paddingX="40px" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<FiPlay fontSize="30px" />}
          colorScheme="green"
          size="lg"
          aria-label="play"
          isRound
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgb(255,255,255,0.2">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              <FiClock />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, index) => (
            <Tr
              sx={{
                transition: "all .3s",
                "&:hover": {
                  bg: "rgba(255,255,255,0.1)",
                },
              }}
              key={song.id}
              cursor="pointer"
            >
              <Td>{index + 1}</Td>
              <Td>{song.name}</Td>
              <Td>{formatDate(song.createdAt)}</Td>
              <Td>{formatTime(song.duration)} </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongsTable;
