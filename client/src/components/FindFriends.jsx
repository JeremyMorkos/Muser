// import { useState } from "react";

// const FindFriends = () => {
//   const [friendSearch, setFriendSearch] = useState([]);
//   const [friend, setfriend] = useState([]);

//   const handleFriendSearchInput = (event) => {
//     setFriendSearch(event.target.value);
//   };

//   const handleFriendSearch = async (event) => {
//     event.preventDefualt();
//     try {
//       const response = await fetch(`/api/friends/${friendSearch}`);
//       const data = await response.json();
//       setFriendSearch(data);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <h5>Friends search bar</h5>
//       <form onSubmit={handleFriendSearch}>
//         <input
//           type="text"
//           value={friendSearch}
//           onChange={handleFriendSearchInput}
//         />
//         <button type="submit">Search</button>
//       </form>
//     </>
//   );
// };

// export default FindFriends;
