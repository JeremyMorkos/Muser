import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";

const PlaylistContext = createContext({});

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const { user, setUser } = useAuth();

 
  const fetchUserPlaylist = async () => {
    const response = await fetch(`/api/songs/${user.id}`);
    const tracks = await response.json();
    setTracks(tracks);
    setUser({...user, tracks})
  };



  return (
    <PlaylistContext.Provider value={{ fetchUserPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
