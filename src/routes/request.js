const express=require('express')
const requestRouter=express.Router()
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // send the connection request
  const user = req.user;
  console.log("Sending Connection request");
  res.send(user.firstName + "Connection Request Send");
});


module.exports=requestRouter;