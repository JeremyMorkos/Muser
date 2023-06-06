import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const FindFriends = () => {
    const {user} = useAuth()
  const [friendSearch, setFriendSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState(null);

  const handleFriendSearchInput = (event) => {
    setFriendSearch(event.target.value);
  };

  const handleFriendSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/${friendSearch}`);
      const friends = await response.json();
      setFriends(friends)
      console.log(friends);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user.id)

  const connectWithFriend = async (friend) => {
    try {
      const response = await fetch(`/api/friends/${friend.display_name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, friendDisplayName: friend.display_name }),
      });
      if (response.ok) {
        console.log("Friend added successfully");
        setNewFriend(newFriend)
      } else {
        console.log("Failed to add friend");
  
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newFriend)
  return (
    <>
      <h5>Friends search bar</h5>
      {friends && friends.map((friend) =>(
        <>
        <p key = {friend.id}>{friend.displayname}</p>
        <button onClick={() => connectWithFriend(friend)}>Connect</button>
        </>
      ))}
      <form onSubmit={handleFriendSearch}>
        <input
          type="text"
          value={friendSearch}
          onChange={handleFriendSearchInput}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default FindFriends;
