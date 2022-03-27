import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";

import Player from "./player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box width="100vw" height="100px" bg="gray.900">
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        {activeSong ? (
          <Box width="40%">
            <Player songs={songs} activeSong={activeSong} />
          </Box>
        ) : null}
        <Box width="30%"></Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
