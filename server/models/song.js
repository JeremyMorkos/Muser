const db = require("../db/index");

const getSongsByUserId = (userId) => {
  return db
    .query("SELECT * FROM songs WHERE user_id = $1;", [userId])
    .then((result) => result.rows);
};

const addSong = (userId, spotify_id, artist, songName, albumImg) => {
  const sql = `INSERT INTO songs (user_id, spotify_id, artist, song_name, album_img) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
  return db
    .query(sql, [userId, spotify_id, artist, songName, albumImg])
    .then((result) => result.rows[0]);
};

const deleteSong = (id) => {
  return db.query("DELETE FROM songs WHERE id = $1;", [id]);
};

module.exports = {
  getSongsByUserId,
  addSong,
  deleteSong,
};
