const db = require("../db/index");

const getAllFriends = () => {
  const sql = `SELECT * FROM friends;`;
  return db.query(sql).then((result) => result.rows);
};

const addFriends = (friendId, userId) => {
  const sql = `
    INSERT INTO friends (friend_id, user_id)
    VALUES ($1, $2)
    RETURNING id, friend_id, user_id;
  `;
  return db.query(sql, [friendId, userId]).then((result) => result.rows[0]);
};

module.exports = {
  getAllFriends,
  addFriends,
};
