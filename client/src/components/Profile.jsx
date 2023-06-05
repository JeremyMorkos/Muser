import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const { user } = useAuth();
  const { fetchUserPlaylist } = usePlaylist();


useEffect(() => {
  const getPlaylist = async () => {
    await fetchUserPlaylist();
  }
  getPlaylist();
}, []);




  return (
    <div>
      <h1>Profile page</h1>
      <EditProfile />

      <h4>Playlist</h4>

      <ul>
        {/* {playlist.map((song) => (
          <li key={song.id}>
            <img src={song.album_img} alt={song.song_name} />
            <div>
              <p>{song.song_name}</p>
              <p>{song.artist}</p>
            </div>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Profile;
