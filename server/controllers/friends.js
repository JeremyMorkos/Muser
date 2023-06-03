const express = require("express");
const router = express.Router();

const { getAllFriends, addFriends } = require("../models/friend");

router.get("/", (req, res, next) => {
  return getAllFriends().then((friends) => {
    res.json(friends);
  });
});

router.post("/", (req, res, next) => {
  const { friendId, userId } = req.body;
  return addFriends(friendId, userId).then((result) => res.json(result));
});
module.exports = router;
