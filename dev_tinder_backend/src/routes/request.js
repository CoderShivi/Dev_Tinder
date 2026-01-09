const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //For invalid status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type " + status });
      }

      //We can't send connect to request my self

      //Connection send only when toUserId is exist
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send("User not found");
      }

      //Connection is already exists
      const existConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existConnectionRequest) {
        return res.status(400).send("Connection is already exist");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: "Connection request Send Successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findById(requestId);

if (!connectionRequest) {
  return res.status(404).json({ message: "Request ID not found" });
}

if (!connectionRequest.toUserId.equals(loggedInUser._id)) {
  return res.status(403).json({ message: "You are not the receiver" });
}

if (connectionRequest.status !== "interested") {
  return res.status(400).json({ message: "Already reviewed" });
}


      connectionRequest.status=status
      const data= await connectionRequest.save()
      
      res.json({message:`Request is ${status} Succefully`,data})

    } catch (err) {
      res.status(500).json({ message: "connection Request not found" });
    }
  }
);

module.exports = requestRouter;