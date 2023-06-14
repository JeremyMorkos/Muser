// import { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthProvider";
// import FriendsProfile from "./Friends";
// import FriendsStyle from "./Friends.module.css";
// import HomeStyle from "./Home.module.css";


// const FindFriends = () => {
//   const { user } = useAuth();
//   const [friendSearch, setFriendSearch] = useState("");
//   const [friends, setFriends] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [showFriendProfile, setShowFriendProfile] = useState(false);
//   const [showFriendList, setShowFriendList] = useState(false);

//   const handleFriendSearchInput = (event) => {
//     setFriendSearch(event.target.value);
//   };

//   useEffect(() => {
//   const fetchFriends = async () => {
//     const res = await fetch(`api/friends/${user.id}`);
//     const result = await res.json();
//     setFriends(result);
//   };
//     fetchFriends();
//   }, []);

//   const deleteFriend = async (friend) => {
//     console.log(friend);
//     const res = await fetch(`api/friends/${user.id}/${friend.id}`, {
//       method: "DELETE",
//     });

//     console.log("Friend deleted successfully");
//     setFriends((prevFriends) => prevFriends.filter((f) => f.id !== friend.id));
//   };

//   const handleFriendSearch = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`/api/users/${friendSearch}`);
//       const friendResult = await response.json();
//       if (friendResult.length > 0) {
//         setFriends(friendResult);
//         toggleFriendList();
//       } else {
//         setFriends([]);
//       }
//       setFriendSearch("");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const connectWithFriend = async (friend) => {
//     try {
//       const response = await fetch(`/api/friends/${friend.displayname}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(friend),
//       });
//       if (response.ok) {
//         console.log("Friend added successfully");
//         // setSelectedFriend(friend);
//         setFriends([friend]);
//         setShowFriendProfile(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const isFriend = (friend) => {
//     return friends.some((f) => f.userid === friend.friendid);
//   };

//   function toggleFriendList() {
//     return setShowFriendList((prevState) => !prevState);
   
//   }

//   return (
//     <>
//       <div>
//         <h1>Friends List</h1>
//         <ul>
//           {friends.map((friend) => (
//             <li key={friend.id}>
//               {friend.frienddisplayname}
//               {isFriend(friend) ? (
//                 <>
//                   <button onClick={() => deleteFriend(friend)}>Delete</button>
//                   <button
//                     onClick={() => {
//                       setSelectedFriend(friend);
//                       setShowFriendProfile(true);
//                     }}
//                   >
//                     View Profile
//                   </button>
//                   {showFriendProfile && selectedFriend && (
//                     <FriendsProfile friendId={selectedFriend.id} />
//                   )}
//                 </>
//               ) : (
//                 <></>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {showFriendList && (
//         <div className={FriendsStyle.modal}>
//           <div className={FriendsStyle.modalContent}>
//             <h2 className={FriendsStyle.modalTitle}>Friends List</h2>
//             <button
//               className={FriendsStyle.modalButtonBack}
//               onClick={toggleFriendList}
//             >
//               Back
//             </button>
//             <ul className={FriendsStyle.modalContent}>
//               {friends.map((friend) => (
//                 <li className={FriendsStyle.modalLi} key={friend.id}>
//                   {friend.displayname}
//                   {!isFriend(friend) && (
//                     <button onClick={() => connectWithFriend(friend)}>
//                       Connect
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleFriendSearch}>
//         <input
//           type="text"
//           value={friendSearch}
//           onChange={handleFriendSearchInput}
//           placeholder="Search for friends"
//           className={HomeStyle.searchInput}
//         />
//         <button className={HomeStyle.searchButton} type="submit">
//           Search
//         </button>
//       </form>
//     </>
//   );
// };
// export default FindFriends;
