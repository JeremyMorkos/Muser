import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import HomeStyles from './Home.module.css'

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
    <div className={HomeStyles.homeContainer}>
      <h1>Songs</h1>

      <form className={HomeStyles.searchForm} onSubmit={handleSearch}>
        <input
          className={HomeStyles.searchInput}
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <select
          className={HomeStyles.searchSelect}
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="track">Track</option>
        </select>
        <button className={HomeStyles.searchButton} type="submit">
          Search
        </button>
      </form>

      {searchData && (
        <ul className={HomeStyles.searchResults}>
          {searchData.map((item) => (
            <li className={HomeStyles.resultItem} key={item.id}>
              <img src={item.albumImg} alt={item.songName} />
              <div>
                <p>{item.songName}</p>
                <p>{item.artist}</p>
                <button
                  className={HomeStyles.addButton}
                  onClick={() => handleAdd(item)}
                >
                  add
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Home;
