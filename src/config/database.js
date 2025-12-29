const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shivani903dubey_db_user:Shivani@cluster0.hlgq6cw.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
