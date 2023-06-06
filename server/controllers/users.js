const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateUserEmail,
  updateUserDisplayName,
  updateUserBio,
  updateUserPassword,
} = require("../models/user");

router.get("/:displayName", (req, res) => {
  console.log(req.params)
  const { displayName } = req.params;
  const userId  = req.session.user.id;
  const requestBody = {
    displayName,
    userId
  };
console.log(requestBody)
  return getAllUsers(requestBody).then((friend) => {
    res.json(friend);
    console.log(friend)
  });
});

router.post("/", (req, res, next) => {
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
        password
      };
 
      req.session.user = newUser;
      return res.status(201).json(newUser);
    });
  });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id
  const { email, displayName, bio, password, passwordCheck } = req.body;


  if (email) {
    return updateUserEmail(id, email)
      .then(() => {
        res.json({ message: "Email updated successfully" });
      })
      .catch((err) => {
        res.status(500).send("Error updating email");
      });
  }


  if (displayName) {
    return updateUserDisplayName(id, displayName)
      .then(() => {
        res.json({ message: "Display name updated successfully" });
      })
      .catch((err) => {
        res.status(500).send("Error updating display name");
      });
  }


  if (bio) {
    return updateUserBio(id, bio)
      .then(() => {
        res.json({ message: "Bio updated successfully" });
      })
      .catch((err) => {
        res.status(500).send("Error updating bio");
      });
  }


  if (password) {
    if (password !== passwordCheck) {
      return res.status(400).json({ error: "Password does not match" });
    }
    return updateUserPassword(id, password)
      .then(() => {
        res.json({ message: "Password updated successfully" });
      })
      .catch((err) => {
        res.status(500).send("Error updating password");
      });
  }

  res.status(400).send("No valid fields provided for update");
});


module.exports = router;