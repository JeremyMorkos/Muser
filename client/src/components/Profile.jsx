import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { usePlaylist } from "../contexts/PlaylistProvider";
import EditProfile from "../components/EditProfile";
import SpotifyPlayer from "react-spotify-web-playback";
import FindFriends from "./FindFriends";

const Profile = () => {
  const { user } = useAuth();
  const { fetchUserPlaylist, deleteSong, fetchAccessToken } = usePlaylist();
  const [player, setPlayer] = useState(undefined);
  const [playerToken, setPlayToken] = useState(null);
  const [spotifyURI, setSpotifyUri] = useState([]);
  const [play, setPlay] = useState(false)

  const spotifyId = user.tracks && user.tracks[0].spotify_id;
  const spotifyUri = `spotify:track:${spotifyId}`;
  useEffect(() => {
    const getPlaylist = async () => {
      await fetchUserPlaylist();
    };
    getPlaylist();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("http://localhost:5173/api/search/usertoken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setPlayToken(playerToken);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect();
      };
    };
    musicPlayer();
  }, []);


  console.log(spotifyURI);
  return (
    <div>
      <h1>Profile page</h1>
      {player && (
        <SpotifyPlayer
          token={playerToken}
          uris={[spotifyURI]}
          play={play}
          styles={{
            activeColor: "#fff",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
        />
      )}
      <EditProfile />
      <FindFriends />
      <h4>Playlist</h4>
      <ul>
        {user.tracks &&
          user.tracks.map((track) => (
            <>
              <li key={track.id}>{track.song_name}</li>
              <li>{track.artist}</li>
              <li>
                <img src={track.album_img} alt="" />
              </li>
              <button onClick={() => deleteSong(track.id)}>Delete song</button>
              <button
                onClick={() => {
                  setSpotifyUri(`spotify:track:${track.spotify_id}`);
                  setPlay(true);
                }}
              >
                Play song
              </button>
            </>
          ))}
      </ul>
    </div>
  );
};
export default Profile;
