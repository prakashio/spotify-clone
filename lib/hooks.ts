import useSWR from "swr";
import featcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR("/me", featcher);

  return { user: data, isLoading: !data && !error, isError: error };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", featcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
