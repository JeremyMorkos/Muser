import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import FriendsStyle from "./Friends.module.css";
import HomeStyle from "../Search/Home.module.css";
import ProfileStyle from "../Profile/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FindFriends = () => {
  const { user } = useAuth();
  const { fetchUserPlaylist } = usePlaylist();
  const [friendSearch, setFriendSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendProfile, setFriendProfile] = useState(null);
  const [friendTracks, setFriendTracks] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);

  //After friend page has mounted, render the friends list of the user.
  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetch(`/api/friends/${user.id}`);
      const result = await res.json();
      setFriends(result);
    };
    fetchFriends();
  }, []);

  // Get the value form the form and set friendsearch state to the friends name.
  const handleFriendSearchInput = (event) => {
    setFriendSearch(event.target.value);
  };

  // search for friends through the value of the handle friend search form.
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

  // connect with a friend by finding them in the database to see if they exist.
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

  // check to see if the user is already friends.
  const isFriend = (friend) => {
    return friends.some((f) => f.frienddisplayname === friend.displayname);
  };

  //open confirmation dialogue for selected friend.
  const deleteFriend = async (friend) => {
    openConfirmationModal(friend);
  };

  //finds friend in the database to delete then filters deleted friends and remove from the list.
  const confirmDeleteFriend = async () => {
    if (friendToDelete) {
      const res = await fetch(`/api/friends/${user.id}/${friendToDelete.id}`, {
        method: "DELETE",
      });
      console.log("Friend deleted successfully");
      setFriends((prevFriends) =>
        prevFriends.filter((f) => f.id !== friendToDelete.id)
      );
      closeConfirmationModal();
    }
  };

  // confirm delete and close dialogue.
  const openConfirmationModal = (friend) => {
    setFriendToDelete(friend);
    setShowConfirmationModal(true);
  };

  // cancel and do not delete friend.
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setFriendToDelete(null);
  };

  //retrieve the profile of the friend through the id.
  const fetchFriendProfile = async (friendId) => {
    const res = await fetch(`/api/friends/${user.id}/${friendId}`);
    const friendProfile = await res.json();
    setFriendProfile(friendProfile);
    setFriendTracks(friendProfile.tracks);
  };

  // open the friends profile to view.
  const openFriendProfile = (friendId) => {
    fetchFriendProfile(friendId);
  };

  // close the friends profile.
  const closeFriendProfile = () => {
    setFriendProfile(null);
  };
  

  console.log(friendProfile)


  return (
    <>
      <div className={FriendsStyle.profileContainer}>
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
      </div>
      <div className={FriendsStyle.friendsContainer}>
        {friends.map((friend) => (
          <div className={FriendsStyle.friendsItem} key={friend.id}>
            <h3>{friend.frienddisplayname}</h3>
            <button
              className={FriendsStyle.deleteButton}
              onClick={() => deleteFriend(friend)}
            >
              Remove
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
      {showConfirmationModal && (
        <div className={FriendsStyle.modal}>
          <div className={FriendsStyle.modalContent}>
            <p className={FriendsStyle.friendNameDelete}>
              Are you sure you want to delete {friendToDelete.frienddisplayname}
              ?
            </p>
            <div className={FriendsStyle.confirmDelete}>
              <button
                className={FriendsStyle.cancelDeleteFriend}
                onClick={closeConfirmationModal}
              >
                Cancel
              </button>
              <button
                className={FriendsStyle.modalButtonBack}
                onClick={confirmDeleteFriend}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
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
            <p>User does not exist</p>
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
                  {user.displayName !== friend.displayname ? (
                    isFriend(friend) ? (
                      <p>You are already Friends</p>
                    ) : (
                      <button
                        className={FriendsStyle.connect}
                        onClick={() => connectWithFriend(friend)}
                      >
                        Connect
                      </button>
                    )
                  ) : (
                    <p>You cannot add yourself as a friend</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {friendProfile && (
        <>
          <div className={FriendsStyle.titleContainer}>
            <h2>{friendProfile.friend.frienddisplayname}'s Playlist</h2>
            <p className={FriendsStyle.friendBio}>{friendProfile.friend.friendbio}</p>
            <button className={FriendsStyle.close} onClick={closeFriendProfile}>
              X
            </button>
          </div>
          <Container>
            <Row>
              {friendTracks.map((track) => (
                <Col sm={true} className={HomeStyle.resultItem} key={track.id}>
                  <div className={HomeStyle.resultItemContent}>
                    <h5> {track.artist}</h5>
                    <img src={track.album_img} alt={track.song_name} />
                    <p>{track.song_name}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default FindFriends;
