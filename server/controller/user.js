const bcrypt = require("bcrypt");
const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    if (req.body.id != req.params.id && !req.body.isAdmin) {
      return res.status(403).json("You do not have a permission");
    }
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
      } catch (error) {
        throw error;
      }
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ user, message: "Account has been updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  if (req.body.id != req.params.id && !req.body.isAdmin) {
    return res.status(403).json("You do not have a permission");
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...data } = user._doc;
    res.status(200).json({
      data,
      message: `${user.username} founded`,
    });
  } catch (error) {
    throw error;
  }
};

const follow = async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.id);
      const user = await User.findById(req.body.id);
  
      if (currentUser._id.equals(user._id)) {
        return res.status(400).json({ message: "You cannot follow yourself" });
      }
  
      if (!user.followers.includes(req.params.id)) {
        await user.updateOne({ $push: { followers: req.params.id } });
        await currentUser.updateOne({ $push: { following: req.body.id } });
        return res.status(200).json({ message: "User followed successfully" });
      } else {
        return res.status(400).json({ message: "You already follow this user" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
//   const unfollow = async (req, res) => {
//     try {
//       const currentUser = await User.findById(req.params.id);
//       const user = await User.findById(req.body.id);
  
//       if (currentUser._id.equals(user._id)) {
//         return res.status(400).json({ message: "You cannot unfollow yourself" });
//       }
  
//       console.log("Current User ID:", req.params.id);
//       console.log("User ID to Unfollow:", req.body.id);
//       console.log("User Followers:", user.followers);
//       console.log("Current User Following:", currentUser.following);
  
//       if (user.followers.includes(req.params.id)) {
//         await user.updateOne({ $pull: { followers: req.params.id } });
//         await currentUser.updateOne({ $pull: { following: req.body.id } });
//         return res.status(200).json({ message: "User unfollowed successfully" });
//       } else {
//         return res.status(400).json({ message: "You don't follow this user" });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: error.message });
//     }
//   };
  
const unfollow = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const user = await User.findById(req.body.id);

        if (currentUser._id.equals(user._id)) {
            return res.status(400).json({ message: "You cannot unfollow yourself" });
        }
        if (user.followers.includes(req.body.id)) {
            await user.updateOne({ $pull: { followers: req.body.id } }, {new: true});
            await currentUser.updateOne({ $pull: { following: req.params.id } }, {new: true});
            return res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            return res.status(400).json({ message: "You do not follow this user" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
  

module.exports = { updateUser, deleteUser, getUser, follow, unfollow };
