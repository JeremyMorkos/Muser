import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import Button from "react-bootstrap/Button";
import HomeStyles from "./Home.module.css";
import FriendsStyle from "../Friends/Friends.module.css";
import "../../index.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Search = ({ setTracks, tracks }) => {
  const { user, isLoadingUser } = useAuth();
  const [category, setCategory] = useState("track");
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [addedSongs, setAddedSongs] = useState([]);
  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // retrieve the value of the change event for the form.
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // search for music through the form the value of the form input.
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/search?q=${searchInput}&type=${category}`
      );
      const data = await response.json();
      if (response.ok) {
        setSearchData(data);
      } else {
        setShowErrModal(true);
        setErrMsg(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // set error message if search fails.
  const openErrModal = () => {
    setErrMsg(errMsg);
    setShowErrModal(true);
  };

  // close error message.
  const closeErrModal = () => {
    setShowErrModal(false);
    setSearchInput("");
  };

  //add new songs and update the users playlist
  const handleAdd = async (song) => {
    try {
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
      });
      const newSong = await response.json();
      setAddedSongs([...addedSongs, newSong]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={HomeStyles.homeContainer}>
        <h1 className={HomeStyles.titleContainer} h1>
          Muser
        </h1>
        <form className={HomeStyles.searchForm} onSubmit={handleSearch}>
          <input
            placeholder="Search for music"
            className={HomeStyles.searchInput}
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button className={HomeStyles.searchButton} type="submit">
            Search
          </button>
        </form>
      </div>
      {showErrModal && (
        <div className={FriendsStyle.modal}>
          <div className={FriendsStyle.modalContent}>
            <p className={FriendsStyle.friendNameDelete}>{errMsg}</p>
            <div className={FriendsStyle.confirmDelete}>
              <button
                className={FriendsStyle.modalButtonBack}
                onClick={closeErrModal}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
      {searchData && (
        <Container>
          <Row>
            {searchData.map((item) => {
              const isAdded = addedSongs.some(
                (song) => song.spotifyId === item.spotifyId
              );
              return (
                <Col sm={true} className={HomeStyles.resultItem} key={item.id}>
                  <div className={HomeStyles.resultItemContent}>
                    <h5>{item.artist}</h5>
                    <img src={item.albumImg} alt={item.songName} />
                    <p>{item.songName}</p>
                    {!isAdded && (
                      <button
                        className={HomeStyles.addButton}
                        onClick={() => handleAdd(item)}
                      >
                        Add to Playlist
                      </button>
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Search;
