const db = require("../db/index");
const bcrypt = require("bcrypt");

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const getAllusers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};

const createUser = (email, userName, bio, password) => {
  const password_hash = generateHash(password);
  const sql = `INSERT INTO users (email, user_name, bio, password_hash) VALUES ($1, $2, $3, $4) RETURNING id; `;
  return db.query(sql, [email, userName, bio, password_hash]);
};

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
  getAllusers,
  createUser,
  getUserByEmail,
};