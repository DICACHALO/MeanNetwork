const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Auth = require("../middleware/auth");
const ValidateUser =require("../middleware/validateUser")

router.post("/savePost" ,Auth,ValidateUser, PostController.savePost );
router.get("/listPost" ,Auth,ValidateUser, PostController.listPost);
router.delete("/deletePost/:_id" ,Auth,ValidateUser,  PostController.deletePost);
router.put("/updatePost", Auth, ValidateUser, PostController.updatePost);

module.exports = router;