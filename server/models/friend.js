const db = require("../db/index");

// These aren't models from an MVC perspective

/*
  id,
  dislay_name
*/

const getAllFriends = (userId) => {
  const sql = `
    SELECT u.id, u.display_name AS friendDisplayName 
    FROM friends AS f
    JOIN users AS u ON f.friend_id = u.id
    WHERE f.user_id = $1;
  `;
  return db.query(sql, [userId]).then((result) => result.rows);
};

const getFriend = (userId, friendId) => {
  const sql = `
    SELECT u.id, u.display_name  AS friendDisplayName, u.bio AS friendBio
    FROM friends AS f
    JOIN users AS u ON f.friend_id = u.id
    WHERE f.user_id = $1 AND f.friend_id = $2;
  `;
  return db.query(sql, [userId, friendId]).then((result) => result.rows[0]);
};

const addFriends = (userId, friendDisplayName) => {
  const sql = `
  INSERT INTO friends (friend_id, user_id)
  SELECT u.id, $2
  FROM users AS u
  WHERE u.display_name = $1
  RETURNING id, friend_id, user_id;
`;
  return db
    .query(sql, [friendDisplayName, userId])
    .then((result) => result.rows[0]);
};

const getFriendTracks = (userId, friendId) => {
  const sql = `
    SELECT s.id, s.spotify_id, s.artist, s.song_name, s.album_img
    FROM songs AS s
    JOIN friends AS f ON s.user_id = f.friend_id
    WHERE f.user_id = $1 AND f.friend_id = $2;
  `;
  return db.query(sql, [userId, friendId]).then((result) => result.rows);
};

const deleteFriend = (userId, friendId) => {
  return db.query(
    "DELETE FROM friends WHERE user_id = $1 AND friend_id = $2 RETURNING *;",
    [userId, friendId]
  );
};

module.exports = {
  getAllFriends,
  getFriend,
  addFriends,
  getFriendTracks,
  deleteFriend,
};
