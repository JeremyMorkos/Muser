const db = require("../db/index");

const getPlaylistByUserId = (userId) => {
    return db.query("SELECT * FROM playlist WHERE user_id = $1;", [userId])
      .then((result) => result.rows);
  };
  
  const addSongToPlaylist = (userId, artist, songName, albumImg) => {
    const sql = `INSERT INTO playlist (user_id, artist, song_name, album_img) VALUES ($1, $2, $3, $4) RETURNING id;`;
    return db.query(sql, [userId, artist, songName, albumImg])
      .then((result) => result.rows[0]);
  };
  
  const deleteSongFromPlaylist = (playlistId) => {
    return db.query("DELETE FROM playlist WHERE id = $1;", [playlistId]);
  };
  
  module.exports = {
    getPlaylistByUserId,
    addSongToPlaylist,
    deleteSongFromPlaylist,
  };