import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";

const PlaylistContext = createContext({});

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const { user, setUser } = useAuth();

  const fetchUserPlaylist = async () => {
    const response = await fetch(`/api/songs/${user.id}`);
    const playlist = await response.json();
    setPlaylist(playlist);
 
  };


  // useEffect(() => {
  //   if (user) {
  //     fetchUserPlaylist();
  //   }
  // }, [user]);




  return (
    <PlaylistContext.Provider value={{ fetchUserPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
