const express = require("express")
const { createPost, updatePost, deletePost, likeDislike, getPost, getTimelinePosts } = require("../controller/post")

const router = express.Router()

router.post("/create", createPost)
router.put("/update/:id", updatePost)
router.delete("/delete/:id", deletePost)
router.put("/like/:id", likeDislike)
router.get("/getpost/:id", getPost)
router.get("/getposts", getTimelinePosts)




module.exports = router