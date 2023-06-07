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
  console.log(req.params);
  const { displayName } = req.params;
  const userId = req.session.user.id;
  const requestBody = {
    displayName,
    userId,
  };
  console.log(requestBody);
  return getAllUsers(requestBody).then((friend) => {
    res.json(friend);
    console.log(friend);
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
        password,
      };

      req.session.user = newUser;
      return res.status(201).json(newUser);
    });
  });
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, displayName, bio, password, passwordCheck } = req.body;

    console.log(req.session.user);
    if (email) {
      await updateUserEmail(id, email);
      req.session.user.email = email;
    }

    if (displayName) {
      await updateUserDisplayName(id, displayName);
      req.session.user.displayName = displayName;
    }

    if (bio) {
      await updateUserBio(id, bio);
      req.session.user.bio = bio;
    }

    if (password && password === passwordCheck) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.session.user.bio = password;
      await updateUserPassword(id, hashedPassword);
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send("Error updating user");
  }
});

module.exports = router;
