import GradientLayout from "../../components/gradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import SongsTable from "../../components/songsTable";

const getBgColor = (id) => {
  const colors = [
    "red",
    "blue",
    "orange",
    "purple",
    "pink",
    "yellow",
    "teal",
    "green",
    "gray",
    "indigo",
    "cyan",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      image={`https://source.unsplash.com/random?sig=${playlist.id}`}
      color={getBgColor(playlist.id)}
      title={playlist.name}
      subtitle="playlist"
      roundImage={false}
      description={`${playlist.songs.length} songs`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.token);

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
