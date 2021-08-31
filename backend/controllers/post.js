const mongoose = require("mongoose");
const Post = require("../models/post");

const savePost = async (req, res) => {
  if (!req.body.title || !req.body.text) return res.status(400).send("Incomplete Data");

  const post = new Post({
    userId: req.user._id,
    title: req.body.title,
    text: req.body.text,
    status: true,
  });

  const result = await post.save();
  if (!result) return res.status(400).send("Failed to register Post");

  return res.status(200).send({ result });
};

const listPost = async (req, res) => {
  const post = await Post.find({ userId: req.user._id });
  if (!post || post.length === "") return res.status(400).send("No Posts");
  return res.status(200).send({ post });
};

const updatePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.status)
    return res.status(400).send("Incomplete Data");

  let post = await Post.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    status: req.body.status,
  });
  if (!post) return res.status(400).send("Post not found");
  return res.status(200).send({ post });
};

const deletePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  let post = await Post.findByIdAndDelete(req.params._id);
  if(!post) return res.status(400).send("Post not found");
  return res.status(200).send({message: "Post deleted"});
};

module.exports = { savePost, listPost, updatePost , deletePost};