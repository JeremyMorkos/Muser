import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";
import EditProfile from "../components/EditProfile";
import SpotifyPlayer from "react-spotify-web-playback";
import ProfileStyles from "./Profile.module.css";
import FriendsStyle from "./Friends.module.css";
import HomeStyle from "./Home.module.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fetchUserPlaylist, deleteSong, fetchAccessToken } = usePlaylist();
  const [player, setPlayer] = useState(undefined);
  const [playerToken, setPlayToken] = useState(null);
  const [spotifyURI, setSpotifyUri] = useState([]);
  const [play, setPlay] = useState(false);

  const spotifyId = user.tracks?.[0]?.spotify_id;
  const spotifyUri = `spotify:track:${spotifyId}`;

  // useEffect(() => {
  //   const redirectToAuthorise = () => {
  //     navigate("/api/search/authorise");
  //   };

  //   redirectToAuthorise();
  // }, []);

  useEffect(() => {
    const getPlaylist = async () => {
      await fetchUserPlaylist();
    };
    getPlaylist();
  }, []);

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

  useEffect(() => {
    const musicPlayer = async () => {
      const playerToken = await fetchAccessToken();
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
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
          console.log("Current State", state);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect();
      };
    };
    musicPlayer();
  }, []);

  const handlePlay = () => {
    setPlay(true);
    if (player) {
      player.resume();
    }
  };

  const handlePause = () => {
    setPlay(false);
    if (player) {
      player.pause();
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
        <EditProfile />
        <div className={ProfileStyles.spotifyPlayerContainer}>
          <SpotifyPlayer
            token={playerToken}
            uris={[spotifyURI]}
            play={play}
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
              height: "150px",
              width: "100%",
              view: "coverart",
              theme: "black",
            }}
          />
        </div>
      </div>
      <div className={FriendsStyle.titleContainer}>
        <h2>My Playlist</h2>
      </div>
      <div className={HomeStyle.resultContainer}>
        <ul className={HomeStyle.searchResults}>
          {user.tracks &&
            user.tracks.map((track) => (
              <>
                <li className={HomeStyle.resultItem} key={track.id}>
                  <div className={HomeStyle.resultItemContent}>
                    <p>{track.artist}</p>
                    <img src={track.album_img} alt="" />
                    <p>{track.song_name}</p>
                    <button     className={FriendsStyle.deleteButton} onClick={() => deleteSong(track.id)}>
                      Delete song
                    </button>
                    <button
                     className={FriendsStyle.profileButton}
                      onClick={() => {
                        setSpotifyUri(`spotify:track:${track.spotify_id}`);
                        setPlay(true);
                      }}
                    >
                      Play song
                    </button>
                  </div>
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
};
export default Profile;
