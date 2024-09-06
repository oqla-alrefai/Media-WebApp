const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },

    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
