import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addPost, getAllPosts, editPost, deletePost, getUnFinishedPosts } from "./post.controller";

export const postRouter = Router();
// add post
postRouter
  .use(verfifyToken)
  .post("/addPost", addPost)
  .get("/allPosts", getAllPosts)
  .get("/unFinished-posts", getUnFinishedPosts)
  .patch("/edit-post/:id", editPost)
  .delete("/delete-post/:id", deletePost);
