const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("server is succesfully Listening on port 3000...");
    });
    // Create a server which is listening on port no. 3000
  })
  .catch((err) => {
    console.log("Database cannot be established");
  });

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Shivani",
    lastName: "Dubey",
    emailId: "shiv@gmail.com",
    age: 26,
    gender: "Female",
    password:"Shiv@123"
  });

  try {
  await user.save();
  res.send("User Added Succesfully")
  }
  catch(err){
    res.status(400).send("Error saving the user:" +err.message)
  }
});
