import NextImage from "next/image";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { FiHome, FiSearch, FiMusic, FiPlus, FiHeart } from "react-icons/fi";
import NextLink from "next/link";
import { usePlaylist } from "../lib/hooks";

const navMenus = [
  {
    name: "Home",
    icon: FiHome,
    route: "/",
  },
  {
    name: "Search",
    icon: FiSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: FiMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: FiPlus,
    route: "/",
  },
  {
    name: "Favorites",
    icon: FiHeart,
    route: "/favourites",
  },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenus.map((menu) => {
              return (
                <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                  <LinkBox>
                    <NextLink href={menu.route} passHref>
                      <LinkOverlay>
                        <ListIcon
                          color="white"
                          marginRight="20px"
                          as={menu.icon}
                        />
                        {menu.name}
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box marginY="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        color="white"
                        marginRight="20px"
                        as={menu.icon}
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="55%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem key={playlist.id} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
