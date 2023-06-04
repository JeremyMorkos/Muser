import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Logout from "./Logout";

const Home = ({setTracks, tracks}) => {
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
        body: JSON.stringify({
          ...song,
          spotifyId: song.spotify_id,
          artist: song.artist,
          songName: song.song_name,
          albumImg: song.album_img,
        }),
      });
      const newSong = await response.json();
      console.log("New Song:", newSong);
      setTracks([...tracks, newSong]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(tracks)


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
