const Post = require("../models/Post");
const User = require("../models/User");


const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json({
      newPost,
      message: "Post has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Post creation failed" });
  }
};
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findById(req.params.id);
    if (updatedPost.userID === req.body.userID) {
      await Post.updateOne({
        $set: req.body,
      });
      return res
        .status(200)
        .json({ updatedPost, message: "Post updated successfully" });
    } else {
      throw new Error("You can update only your post");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update a post",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findById(req.params.id);
    if (deletedPost.userID === req.body.userID) {
      await Post.deleteOne();
      res.status(200).json({
        message: "Post has been deleted",
        deletedPost,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete the post",
    });
  }
};

const likeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
      console.log(post);
        await Post.updateOne({
            $push: {likes: req.body.userId}
        })
    }else{
        await Post.updateOne({
            $pull: {likes: req.body.userId}
        })
    }
    res.status(200).json({
        post,
        message: "Post action has been completed"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to like or dislike the post",
    });
  }
};

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            post,
            message: "Post has been fetched successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Failed to fetch the post"
        })
    }
}

const getTimelinePosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const post = await Post.find({userID: currentUser._id})
        const timelinePosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({userID: friendId})
            })
        )
        res.status(200).json({
            posts: post.concat({...timelinePosts}),
            message: "Timeline posts fetched"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Failed to get timeline posts"
        })
    }
}

module.exports = { createPost, updatePost, deletePost, likeDislike, getPost, getTimelinePosts };
