import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

const FindFriends = () => {
  const { user } = useAuth();
  const [friendSearch, setFriendSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [showFriendList, setShowFriendList] = useState(false);

  const handleFriendSearchInput = (event) => {
    setFriendSearch(event.target.value);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetch(`api/friends/${user.id}`);
      const result = await res.json();
      setFriends(result);
    };

    fetchFriends();
  }, []);

  const deleteFriend = async (friend) => {
    console.log(friend);
    const res = await fetch(`api/friends/${user.id}/${friend.id}`, {
      method: "DELETE",
    });
 
      console.log("Friend deleted successfully");
      setFriends((prevFriends) =>
        prevFriends.filter((f) => f.id !== friend.id)
      );

  };

  const handleFriendSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/${friendSearch}`);
      const friendResult = await response.json();
      setFriends(friendResult);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(friends)
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
        const updatedFriends = [...friends, friend];
        setFriends(updatedFriends);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFriend = (friend) => {
    return friends.some((f) => f.userid === friend.friendid);
  };


  const toggleFriendList = () => {
    setShowFriendList((prevState) => !prevState); 
  };


  return (
    <>
      <h5>Friends search bar</h5>
      <button onClick={toggleFriendList}>
        {showFriendList ? "Hide Friend List" : "Show Friend List"}
      </button>
      {showFriendList && (
        <div>
          {friends.map((friend) => (
            <div key={friend.id}>
              <p>{friend.displayname}</p>

              
              {/* // fix // */}
              <p>{friend.frienddisplayname}</p> 
              {isFriend(friend) ? (
                <>
                  <button onClick={() => deleteFriend(friend)}>Delete</button>
                  <button>View Profile</button>
                </>
              ) : (
                <>
                  {friend.userid !== user.id && (
                    <button onClick={() => connectWithFriend(friend)}>Connect</button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
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