const path = require('path');
const express = require('express');
const router = express.Router();

const { verifyToken } = require("../verifyToken"); 
const postController = require("../controller/user");

router.post("/:userId", verifyToken ,postController.postUserProfile);
router.get("/users/:userId",postController.getUserProfile);





module.exports=router;