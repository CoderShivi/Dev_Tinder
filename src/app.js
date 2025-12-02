const express=require("express");
const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})// Request Handler Function

app.listen(3000,()=>{
    console.log("server is succesfully Listening on port 3000...")
}) // Create a server which is listening on port no. 3000

