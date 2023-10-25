import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import EditProfile from "../Profile/EditProfile";
import SpotifyPlayer from "react-spotify-web-playback";
import ProfileStyles from "../Profile/Profile.module.css";
import FriendsStyle from "../Friends/Friends.module.css";
import HomeStyle from "../Search/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faArrowRotateLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Playlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fetchUserPlaylist, deleteSong, fetchAccessToken } = usePlaylist();
  const [player, setPlayer] = useState(undefined);
  const [playerToken, setPlayToken] = useState(null);
  const [spotifyURI, setSpotifyUri] = useState([]);
  const [play, setPlay] = useState(false);

  // Assign the value of the first track's Spotify ID in the user's playlist.
  const spotifyId = user.tracks?.[0]?.spotify_id;

  // Construct the Spotify URI for playing a specific track using its Spotify ID
  const spotifyUri = `spotify:track:${spotifyId}`;

  // when playlist component is mounted display the users playlist.
  useEffect(() => {
    const getPlaylist = async () => {
      await fetchUserPlaylist();
    };
    getPlaylist();
  }, []);

  // spotify api call to fetch the usertoken.
  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(
        "http://localhost:5173/api/search/usertoken",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.token) {
        setPlayToken(data.token);
      }
    };
    fetchToken();
  }, []);

  // once usertoken is validated mount the spotify webplayer.
  useEffect(() => {
    const musicPlayer = async () => {
      const playerToken = await fetchAccessToken();
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Muser",
          getOAuthToken: (cb) => {
            cb(playerToken);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.addListener("ready", async ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setPlayToken(playerToken);

          const state = await player.getCurrentState();
        });

        player.addListener("not_ready", ({ device_id }) => {});

        player.connect();
      };
    };
    musicPlayer();
  }, []);

  const handlePlay = () => {
    if (player) {
      player.resume().then(() => {
        setPlay(true);
      });
    }
  };

  const handlePause = () => {
    if (player) {
      player.pause().then(() => {
        setPlay(false);
      });
    }
  };
  const handleVolumeChange = (value) => {
    if (playerRef.current) {
      playerRef.current.setVolume(value);
    }
  };

  return (
    <>
      <div className={ProfileStyles.profileContainer}>
        <h1 className={ProfileStyles.titleContainer}> Playlist</h1>
        <div className={ProfileStyles.spotifyPlayerContainer}>
          <SpotifyPlayer
            token={playerToken}
            uris={[spotifyURI]}
            play={play}
            SpPlaybackP
            onPlay={handlePlay}
            onPause={handlePause}
            onVolumeChange={handleVolumeChange}
            callback={(state) => {
              if (!state.isPlaying) {
                setPlay(false);
              }
            }}
            styles={{
              activeColor: "#fff",
              bgColor: "#111",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
              showSaveIcon: true,
              showPlayIcon: true,
              allowContextMenu: true,
              initialVolume: 0.8,
              height: "100px",
              width: "100%",
              view: "coverart",
              theme: "black",
            }}
          />
        </div>
      </div>
      <Container>
        <Row>
          {user.tracks &&
            user.tracks.map((track) => (
              <Col sm={true} className={HomeStyle.resultItem} key={track.id}>
                <div className={HomeStyle.resultItemContent}>
                  <h5>{track.artist}</h5>
                  <img src={track.album_img} alt="album_art" />
                  <p>{track.song_name}</p>
                  <div className={FriendsStyle.profileBtnContainer}>
                    <button
                      className={FriendsStyle.deleteButton}
                      onClick={() => deleteSong(track.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                    <button
                      className={FriendsStyle.playButton}
                      onClick={() => {
                        setSpotifyUri(`spotify:track:${track.spotify_id}`);
                        setPlay(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlay} size="lg" />
                    </button>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Playlist;
