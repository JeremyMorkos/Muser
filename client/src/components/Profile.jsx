import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";


const Profile = () => {
  const { user } = useAuth();
  const { fetchUserPlaylist, playlist } = usePlaylist();

  // const [userPlaylist, setUserplayList] = useState([])


console.log(user)
 


  return (
    <div>
      <h1>Profile page</h1>
    
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
