const db = require("../db/index");

const getAllFriends = (userId) => {
  const sql = `
    SELECT u.id, u.display_name AS friendDisplayName 
    FROM friends AS f
    JOIN users AS u ON f.friend_id = u.id
    WHERE f.user_id = $1;
  `;
  return db.query(sql, [userId]).then((result) => result.rows);
};

const addFriends = (userId, friendDisplayName) => {
  const sql = `
  INSERT INTO friends (friend_id, user_id)
  SELECT u.id, $2
  FROM users AS u
  WHERE u.display_name = $1
  RETURNING id, friend_id, user_id;
`;
return db.query(sql, [friendDisplayName, userId])
.then((result) => result.rows[0]);
};

module.exports = {
  getAllFriends,
  addFriends,
};
