const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(
      process.env.DB_URL
    );
    console.log(`db connected successfully`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { dbConnect };