import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";
import EditProfile from "../components/EditProfile";
import SpotifyPlayer from "react-spotify-web-playback";

const Profile = () => {
  const { user } = useAuth();
  const { fetchUserPlaylist, deleteSong, fetchAccessToken } = usePlaylist();

  useEffect(() => {
    const getPlaylist = async () => {
      await fetchUserPlaylist();
    };
    getPlaylist();
  }, []);

  return (
    <div>
      <h1>Profile page</h1>
      <EditProfile />
      <></>
      <h4>Playlist</h4>
      <ul>
        {user.tracks &&
          user.tracks.map((track) => (
            <>
              <li key={track.id}>{track.song_name}</li>
              <li>{track.artist}</li>
              <li>
                <img src={track.album_img} />
              </li>
              <button onClick={() => deleteSong(track.id)}>Delete song</button>
            </>
          ))}
      </ul>
    </div>
  );
};

export default Profile;
