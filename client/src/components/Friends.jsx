import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";
import FriendsStyle from "./Friends.module.css";
import HomeStyle from "./Home.module.css";
import ProfileStyle from "./Profile.module.css";

const FindFriends = () => {
  const { user } = useAuth();
  const { fetchUserPlaylist } = usePlaylist();
  const [friendSearch, setFriendSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendProfile, setFriendProfile] = useState(null);
  const [friendTracks, setFriendTracks] = useState([]);

  const handleFriendSearchInput = (event) => {
    setFriendSearch(event.target.value);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetch(`/api/friends/${user.id}`);
      const result = await res.json();
      setFriends(result);
    };
    fetchFriends();
  }, []);

  const deleteFriend = async (friend) => {
    console.log(friend);
    const res = await fetch(`/api/friends/${user.id}/${friend.id}`, {
      method: "DELETE",
    });

    console.log("Friend deleted successfully");
    setFriends((prevFriends) => prevFriends.filter((f) => f.id !== friend.id));
  };

  const handleFriendSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/${friendSearch}`);
      const friendResult = await response.json();
      setSelectedFriend(friendResult);
      setFriendSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  const connectWithFriend = async (friend) => {
    try {
      const response = await fetch(`/api/friends/${friend.displayname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(friend),
      });
      if (response.ok) {
        console.log("Friend added successfully");
        const res = await fetch(`/api/friends/${user.id}`);
        const result = await res.json();
        setFriends(result);
        setSelectedFriend(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriendProfile = async (friendId) => {
    const res = await fetch(`/api/friends/${user.id}/${friendId}`);
    const friendProfile = await res.json();
    setFriendProfile(friendProfile);
    setFriendTracks(friendProfile.tracks);
  };

  const openFriendProfile = (friendId) => {
    fetchFriendProfile(friendId);
  };

  const isFriend = (friend) => {
    return friends.some((f) => f.frienddisplayname === friend.displayname);
  };

  const closeFriendProfile = () => {
    setFriendProfile(null);
  };

  console.log("opened friends", friendProfile)

  return (
    <>
      <h1 className={FriendsStyle.titleContainer}>Friends</h1>
      <form
        className={FriendsStyle.homeContainer}
        onSubmit={handleFriendSearch}
      >
        <input
          type="text"
          value={friendSearch}
          onChange={handleFriendSearchInput}
          placeholder="Search for friends"
          className={HomeStyle.searchInput}
        />
        <button className={HomeStyle.searchButton} type="submit">
          Search
        </button>
      </form>

      <div className={FriendsStyle.friendsContainer}>
        {friends.map((friend) => (
          <div className={FriendsStyle.friendsItem} key={friend.id}>
            <h3>{friend.frienddisplayname}</h3>
            <button
              className={FriendsStyle.deleteButton}
              onClick={() => deleteFriend(friend)}
            >
              Delete
            </button>
            <button
              className={FriendsStyle.profileButton}
              onClick={() => openFriendProfile(friend.id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {selectedFriend && selectedFriend.length === 0 && (
        <div className={FriendsStyle.modal}>
          <div className={FriendsStyle.modalContent}>
            <h2 className={FriendsStyle.modalTitle}>Friends List</h2>
            <button
              className={FriendsStyle.modalButtonBack}
              onClick={() => setSelectedFriend(null)}
            >
              Back
            </button>
            <p>User does not exist.</p>
          </div>
        </div>
      )}
      {selectedFriend && selectedFriend.length > 0 && (
        <div className={FriendsStyle.modal}>
          <div className={FriendsStyle.modalContent}>
            <h2 className={FriendsStyle.modalTitle}>Friends List</h2>
            <button
              className={FriendsStyle.modalButtonBack}
              onClick={() => setSelectedFriend(null)}
            >
              Back
            </button>
            <ul className={FriendsStyle.modalContent}>
              {selectedFriend.map((friend) => (
                <li className={FriendsStyle.modalLi} key={friend.id}>
                  {friend.displayname}
                  {!isFriend(friend) ? (
                    <button onClick={() => connectWithFriend(friend)}>
                      Connect
                    </button>
                  ) : (
                    <p>Already Friends</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {friendProfile && (
        <>
        <div className={FriendsStyle.titleContainer} >
          <h2 >{friendProfile.friend.frienddisplayname}'s Playlist</h2>
          <button className={FriendsStyle.close}onClick={closeFriendProfile}>Exit Profile</button>
          </div>
          <div className={HomeStyle.resultContainer}>
          <ul className={HomeStyle.searchResults}>
          {friendTracks.map((track) => (
            <li className={HomeStyle.resultItem}  key={track.id}>
              <div className={HomeStyle.resultItemContent}>
              <p> {track.artist}</p>
              <img src={track.album_img} alt={track.song_name} />
              <p>{track.song_name}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
        </>
      )}
    </>
  );
};

export default FindFriends;
