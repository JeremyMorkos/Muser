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
  getUserByDisplayName,
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

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  return getUserByEmail(email)
    .then((userEmail) => {
      console.log(userEmail);
      if (userEmail) {
        throw "The email address is not available";
      }

      return getUserByDisplayName(displayName);
    })
    .then((userDisplayName) => {
      console.log(userDisplayName);
      if (userDisplayName) {
        throw "The username is not available";
      }

      console.log("creating user");
      return createUser(email, displayName, bio, password);
    })
    .then((result) => {
      console.log(`Created user ${result}`);

      const newUser = {
        id: result.rows[0].id,
        email,
        displayName,
        bio,
        password,
      };

      req.session.user = newUser;
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);

      res.status(400).json({
        error: err,
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

    res.json({ message: "User updated successfully", user: req.session.user });
  } catch (err) {
    res.status(500).send("Error updating user");
  }
});

module.exports = router;
