const express = require("express");
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const retrieveToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });
  const token = await response.json();
  return token;
};

router.get("/search", async (req, res) => {
  const userSearch = req.query.q;
  const userToken = await retrieveToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${userSearch}&type=track`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken.access_token,
      },
    }
  );
  const result = await response.json();
  const user_id = req.session.user.id

  const newResult = result.tracks.items.map((item) => ({
    id: item.id,
    spotify_id: item.id,
    artist: item.artists[0].name,
    song_name: item.name,
    album_img: item.album.images[0].url,
    user_id: user_id
  }));

  return res.json(newResult);
});

  // Keep the output of this endpoint consistent with the proposed output of /songs


module.exports = router;
