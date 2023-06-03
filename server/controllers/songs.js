const express = require("express");
const router = express.Router();
const { getSongsByUserId, addSong, deleteSong } = require("../models/song");

router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  return getSongsByUserId(userId).then((songs) => {
    res.json(songs);
  });
});

router.post("/", (req, res) => {
  const userId = req.session.user.id;
  const { spotifyId, artist, songName, albumImg } = req.body;
  return addSong(userId, spotifyId, artist, songName, albumImg).then(() => {
    const newSong = {
      userId,
      spotifyId,
      artist,
      songName,
      albumImg,
    };
    res.status(201).json(newSong);
    console.log(newSong);
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  return deleteSong(id)
    .then((result) => {
      res.json({ message: "Song deleted from playlist" });
    })
    .catch((error) => {
      res.status(500).send("Error deleting song");
      throw error;
    });
});

module.exports = router;
