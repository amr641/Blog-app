import { Router } from "express";
import { deleteUserProfile, login, signUp, updateUserProfile } from "./user.controller";
import { emailExistence } from "../../middleware/auth/userExistence";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { verfifyToken } from "../../middleware/verifiyToken";
import { checkScheduledPosts } from "../../middleware/checkScheduled";

export const userRouter = Router();
userRouter
  .post("/signup", uploadSingleFile("user", "avatar"), emailExistence, signUp)
  .post("/signin", checkScheduledPosts,login)
  .use(verfifyToken)
  .patch("/update-profile",uploadSingleFile("user", "avatar"),updateUserProfile)
  .delete("/delete-profile",deleteUserProfile)
