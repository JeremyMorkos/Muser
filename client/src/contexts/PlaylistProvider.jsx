import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";

const PlaylistContext = createContext({});

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const { user, setUser } = useAuth();
  const [token, setToken] = useState();

  const fetchAccessToken = async () => {
    const response = await fetch("/api/search/usertoken");
    const token = await response.json();
    return token.token;
  };

  const fetchUserPlaylist = async () => {
    const response = await fetch(`/api/songs/${user.id}`);
    const tracks = await response.json();
    setTracks(tracks);
    setUser({ ...user, tracks });
  };

  const deleteSong = async (id) => {
    const response = await fetch(`/api/songs/${id}`, {
      method: "DELETE",
    });

    await fetchUserPlaylist();
    const updatedTracks = tracks.filter((track) => track.id !== id);
    setTracks(updatedTracks);
    setUser({ ...user, tracks: updatedTracks });
    console.log(tracks);
  };

  return (
    <PlaylistContext.Provider
      value={{ fetchUserPlaylist, deleteSong, fetchAccessToken }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
