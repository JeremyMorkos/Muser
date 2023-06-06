import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Logout from "./Logout";

const Home = ({ setTracks, tracks }) => {
  const { user, isLoadingUser } = useAuth();
  const [category, setCategory] = useState("track");
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/search?q=${searchInput}`);
      const data = await response.json();
      setSearchData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (song) => {
    try {
      console.log("Adding song:", song);
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
      });
      const newSong = await response.json();
      console.log("New Song:", newSong);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <h1>Search songs</h1>

      {user && (
        <>
          <p>Logged in: {user.displayName}</p>
          <Logout />
          {/* <FindFriends /> */}
        </>
      )}

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="track">Track</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {searchData && (
        <ul>
          {searchData.map((item) => (
            <li key={item.id}>
              <img src={item.albumImg} alt={item.songName} />
              <div>
                <p>{item.songName}</p>
                <p>{item.artist}</p>
                <button onClick={() => handleAdd(item)}>add</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
