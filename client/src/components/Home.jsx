import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Logout from "./Logout";

const Home = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("track");
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${searchInput}`);
      const data = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user)

  return (
    <>
      <h1>Search songs</h1>
      <Logout />
      <p>{user.display_name}</p>

      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <select onChange={handleCategoryChange}>
          <option value="track">Track</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchData && (
        <ul>
          {searchData.map((item) => (
            <li key={item.id}>
              <img src={item.album_img} alt={item.song_name} />
              <div>
                <p>{item.song_name}</p>
                <p>{item.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
