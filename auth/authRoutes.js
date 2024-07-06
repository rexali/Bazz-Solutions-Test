const express = require("express");

const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { verifyUserToken } = require("./verifyUserToken");

var authRouter = express.Router();

authRouter.post("/",(req,res,next)=>{});

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/verify", verifyUserToken);


module.exports={
    authRouter
}