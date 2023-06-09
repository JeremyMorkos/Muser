const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getUserByEmail } = require("../models/user");

router.get("/", (req, res) => {
  const { user } = req.session;
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(user);
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "logged out" });
  });
});

router.post("/", (req, res, next) => {
  const { email, password, displayName, bio } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email or password is missing" });
  }

  return getUserByEmail(email)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const { id, email, display_name, bio } = user;
      const loggedInUser = {
        id,
        email,
        displayName: display_name,
        bio,
      };
      delete loggedInUser.password_hash;
      req.session.user = loggedInUser;
      return res.json(loggedInUser);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
