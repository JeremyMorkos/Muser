import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState([]);

useEffect (()=>{
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/songs/${user.user.id}`);
      const songs = await response.json();
      setProfile(songs);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUserProfile()
},[])



return (
    <div>
      <h1>Profile page</h1>
      <h4>Playlist</h4>
      <ul>
        {profile.map((song) => (
          <li key={song.id}>
            <img src={song.album_img} alt={song.song_name} />
            <div>
              <p>{song.song_name}</p>
              <p>{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Profile;
