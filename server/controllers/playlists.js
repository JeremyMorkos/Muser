const express = require("express");
const router = express.Router();
const {
  getPlaylistByUserId,
  addSongToPlaylist,
  deleteSongFromPlaylist,
} = require("../models/playlist");

router.get("/playlist/:userId", (req, res) => {
  const userId = req.params.userId;
  return getPlaylistByUserId(userId).then((playlist) => {
    res.json(playlist);
  });
});

router.post("/playlist", (req, res) => {
  const userId = req.session.user.id;
  const { artist, songName, albumImg } = req.body;
  return addSongToPlaylist(userId, artist, songName, albumImg).then(
    (result) => {
      console.log(result);
      const newSong = {
        id: result.rows,
        artist,
        songName,
        albumImg,
      };
      res.status(201).json(newSong);
    }
  );
});

router.delete("/playlist/:id", (req, res) => {
  const id = Number(req.params.id);
  return deleteSongFromPlaylist(id)
    .then((result) => {
      res.json({ message: "Song deleted from playlist" });
    })
    .catch((error) => {
      res.status(500).send("Error deleting song");
    });
});

module.exports = router;
