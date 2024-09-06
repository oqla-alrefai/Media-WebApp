const express = require("express")
const userRouter = require("./users")
const auth = require("./auth")
const post = require("./post")


const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", auth)
router.use("/post", post)
module.exports = router