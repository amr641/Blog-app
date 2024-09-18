import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addPost, getAllPosts, editPost, deletePost, getUnFinishedPosts } from "./post.controller";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { protectRoutes } from "../../middleware/auth/auth";
import validate from "../../middleware/validate";
import { addPostVal, editPostVal } from "./postValidator";

export const postRouter = Router();
// add post
postRouter
  .use(verfifyToken,protectRoutes)
  .post("/addPost", validate(addPostVal),uploadSingleFile("posts", "content"),addPost)
  .get("/allPosts", getAllPosts)
  .get("/unFinished-posts", getUnFinishedPosts)
  .patch("/edit-post/:id", uploadSingleFile("posts", "content"),validate(editPostVal),editPost)
  .delete("/delete-post/:id", deletePost);
