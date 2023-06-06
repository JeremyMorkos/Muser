const express = require("express");
const router = express.Router();

const { getAllFriends, addFriends, deleteFriend } = require("../models/friend");

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  return getAllFriends(userId).then((friends) => {
    res.json(friends);
  });
});

router.post("/:displayname", (req, res, next) => {
  const { displayname } = req.params;
  const  userId  = req.session.user.id;
  console.log("added friend:", req.body)
  return addFriends(userId,displayname).then((result) => res.json(result));

});

router.delete("/:userId/:friendId", (req, res, next) => {
  const { userId, friendId } = req.params;
  return deleteFriend(userId, friendId).then((removed) => {
    res.json(removed);
  });
});

module.exports = router;
