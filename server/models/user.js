const db = require("../db/index");
const bcrypt = require("bcrypt");

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const getAllUsers = (requestBody) => {
  const { displayName, userId } = requestBody;
  return db
    .query("SELECT id, display_name AS displayName, $2 AS userId FROM users WHERE display_name = $1;", [displayName, userId])
    .then((result) => result.rows);
};

const createUser = (email, displayName, bio, password) => {
  const password_hash = generateHash(password);
  const sql = `INSERT INTO users (email, display_name, bio, password_hash) VALUES ($1, $2, $3, $4) RETURNING id; `;
  
  console.log('executing db query');
  return db.query(sql, [email, displayName, bio, password_hash]);
};

const updateUserEmail = (id, email) => {
  const sql = `UPDATE users SET email = $2 WHERE id = $1;`;
  return db.query(sql, [id, email]);
};

const updateUserDisplayName = (id, displayName) => {
  const sql = `UPDATE users SET display_name = $2 WHERE id = $1;`;
  return db.query(sql, [id, displayName]);
};

const updateUserBio = (id, bio) => {
  const sql = `UPDATE users SET bio = $2 WHERE id = $1;`;
  return db.query(sql, [id, bio]);
};

const updateUserPassword = (id, password) => {
  const password_hash = generateHash(password);
  const sql = `UPDATE users SET password_hash = $2 WHERE id = $1;`;
  return db.query(sql, [id, password_hash]);
};

const getUserByDisplayName = (displayName) => {
  return db
    .query("SELECT * FROM users WHERE display_name = $1", [displayName])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
    });
}

const getUserByEmail = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
    });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUserEmail,
  updateUserDisplayName,
  updateUserBio,
  updateUserPassword,
  getUserByEmail,
  getUserByDisplayName,
};
