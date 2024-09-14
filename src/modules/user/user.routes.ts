import { Router } from "express";
import { deleteUserProfile, login, signUp, updateUserProfile } from "./user.controller";
import { emailExistence } from "../../middleware/auth/userExistence";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { verfifyToken } from "../../middleware/verifiyToken";

export const userRouter = Router();
userRouter
  .post("/signup", uploadSingleFile("user", "avatar"), emailExistence, signUp)
  .post("/signin", login)
  .use(verfifyToken)
  .patch("/update-profile",uploadSingleFile("user", "avatar"),updateUserProfile)
  .delete("/delete-profile",deleteUserProfile)
