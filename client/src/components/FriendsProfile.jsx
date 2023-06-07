import { Profiler, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";


const FriendsProfile = ({friendId}) => {
    const {user} = useAuth()
    const { fetchUserPlaylist } = usePlaylist();
    const [friendProfile, setFriendProfile] = useState([]);
  
    useEffect(() => {
      const fetchFriendProfile = async () => {
        const res = await fetch(`/api/friends/${user.id}/${friendId}`);
        const friendProfile = await res.json();
        setFriendProfile(friendProfile);
      };
      fetchFriendProfile();
    }, []);

console.log(friendProfile)  
console.log(friendProfile.tracks)  


return (
  <div>
    <h1>Friend's Track List</h1>
    <ul>
      {friendProfile.tracks && friendProfile.tracks.length > 0 ? (
        friendProfile.tracks.map((track) => (
          <li key={track.id}>
            <p>Artist: {track.artist}</p>
            <p>Song Name: {track.song_name}</p>
            <img src={track.album_img} alt={track.song_name} />
          </li>
        ))
      ) : (
        <p>No tracks available.</p>
      )}
    </ul>
  </div>
);
};


export default FriendsProfile;
