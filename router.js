import express from "express";

export const userRouter = express.Router(); // import 할때  =>   import {userRouter} from "./router"

userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));
userRouter.get("/nation", (req, res) => res.send("user nation"));
