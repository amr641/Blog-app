import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addPost, getAllPosts, editPost, deletePost, getUnFinishedPosts } from "./post.controller";
import { addComment } from "../comment/commentController";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { protectRoutes } from "../../middleware/auth/auth";

export const postRouter = Router();
// add post
postRouter
  .use(verfifyToken,protectRoutes)
  .post("/addPost", uploadSingleFile("posts", "content"),addPost)
  .post("/:id/addCommnet",addComment)
  .get("/allPosts", getAllPosts)
  .get("/unFinished-posts", getUnFinishedPosts)
  .patch("/edit-post/:id", editPost)
  .delete("/delete-post/:id", deletePost);
