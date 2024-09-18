import { Router } from "express";
import { deleteUserProfile, login, signUp, updateUserProfile } from "./user.controller";
import { emailExistence } from "../../middleware/auth/userExistence";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { verfifyToken } from "../../middleware/verifiyToken";
import { checkScheduledPosts } from "../../middleware/checkScheduled";
import { changeUserPassword } from "../../middleware/auth/auth";
import { changePasswordVal, deleteProfileVal, signInVal, signupVal, updateProfileVal } from "./user.validation";
import validate from "../../middleware/validate";

export const userRouter = Router();
userRouter
  .post("/signup", validate(signupVal),uploadSingleFile("user", "avatar"), emailExistence, signUp)
  .post("/signin", validate(signInVal),checkScheduledPosts,login)
  .use(verfifyToken)
  .patch("/update-profile",validate(updateProfileVal),uploadSingleFile("user", "avatar"),updateUserProfile)
  .patch("/change-password",validate(changePasswordVal),changeUserPassword)
  .delete("/delete-profile",validate(deleteProfileVal),deleteUserProfile)
