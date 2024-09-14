import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addPost, getAllPosts, editPost, deletePost, getUnFinishedPosts } from "./post.controller";
import { addComment } from "../comment/commentController";

export const postRouter = Router();
// add post
postRouter
  .use(verfifyToken)
  .post("/addPost", addPost)
  .post("/:id/addCommnet",addComment)
  .get("/allPosts", getAllPosts)
  .get("/unFinished-posts", getUnFinishedPosts)
  .patch("/edit-post/:id", editPost)
  .delete("/delete-post/:id", deletePost);
