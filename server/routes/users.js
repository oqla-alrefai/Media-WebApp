const express = require("express")
const { updateUser, deleteUser, getUser, follow, unfollow } = require("../controller/user")

const router = express.Router()

router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/:id",getUser)
router.put("/follow/:id",follow)
router.put("/unfollow/:id",unfollow)


module.exports = router