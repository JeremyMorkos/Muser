const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getAllusers, createUser, getUserByEmail } = require("../models/user");


router.get("/users", (req, res) => {
  return getAllusers().then((users) => {
    res.json(users);
  });
});

router.post("/signup", (req, res, next) => {
  const { email, displayName, bio, password, passwordCheck } = req.body;

  if (!email || !displayName || !password || !passwordCheck) {
    return res
      .status(400)
      .json({ error: "Email, user name, or password is missing" });
  }

  if (password !== passwordCheck) {
    return res.status(400).json({ error: "Password does not match" });
  }

  return getUserByEmail(email).then((user) => {
    if (user) {
      return res.status(400).json({
        error: "The email address is already used by an existing user",
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    return createUser(email, displayName, bio, password).then((result) => {
      const newUser = {
        id: result.rows[0].id,
        email,
        displayName,
        bio,
      };
      res.status(201).json(newUser);
    });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  
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

      delete user.password_hash;
      req.session.user = user;
      return res.json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// check if user is still logged in
router.get("/login", (req, res) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json({ user });
});

router.delete("/login", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "logged out" });
  });
});


module.exports = router;
