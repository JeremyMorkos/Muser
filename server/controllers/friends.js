const express = require("express");
const router = express.Router();

const { getAllFriends,getFriend, addFriends, deleteFriend, getFriendTracks } = require("../models/friend");

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  return getAllFriends(userId).then((friends) => {
    res.json(friends);
  });
});

router.get("/:userId/:friendId", (req, res, next) => {
  const { userId, friendId } = req.params;
  return Promise.all([getFriend(userId, friendId), getFriendTracks(userId, friendId)]) 
    .then(([friend, tracks]) => {
      res.json({friend, tracks} );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve friend and tracks." });
    });
});

router.get("/:userId/:friendId", (req, res, next) => {
  const { userId, friendId } = req.params;
  return getFriend(userId, friendId).then((friend) => {
    res.json(friend);
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
