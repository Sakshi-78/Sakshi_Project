const path = require('path');
const express = require('express');
const router = express.Router();

const verifyToken = require("../verifyToken");

const postController = require("../controller/tweet.js");

router.post("/",verifyToken,postController.postCreateTweet);
router.get("/tweet/:id",postController.getAllTweets);
router.get('/users/:userId/tweet',postController.getUserTweet);
router.delete("/:id",verifyTokem,postController.deleteTweet);
router.put("/:id/like",postController.likeTweet);
router.get("/explore",postController.getExplore);
module.exports=router;