import { Router } from "express";
import { deleteUserProfile, login, signUp, updateUserProfile } from "./user.controller";
import { emailExistence } from "../../middleware/auth/userExistence";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { verfifyToken } from "../../middleware/verifiyToken";
import { checkScheduledPosts } from "../../middleware/checkScheduled";
import { changeUserPassword } from "../../middleware/auth/auth";
import validate from "../../middleware/validate";
import { changePasswordVal, signInVal, signupVal } from "./userValidator";

export const userRouter = Router();
userRouter
  .post("/signup", uploadSingleFile("user", "avatar"), validate(signupVal),emailExistence, signUp)
  .post("/signin", validate(signInVal),checkScheduledPosts,login)
  .use(verfifyToken)
  .patch("/update-profile",uploadSingleFile("user", "avatar"),validate(updateUserProfile),updateUserProfile)
  .patch("/change-password",validate(changePasswordVal),changeUserPassword)
  .delete("/delete-profile",deleteUserProfile)
