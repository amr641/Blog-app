import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addPost, getAllPosts, editPost, deletePost, getUnFinishedPosts } from "./post.controller";
import { addComment } from "../comment/commentController";
import { uploadSingleFile } from "../../fileUpload/fileUpload";
import { protectRoutes } from "../../middleware/auth/auth";
import validate from "../../middleware/validate";
import { deletePostVal, editPostVal, getAllPostsVal, getUnFinisedPostsVal } from "./post.validation";

export const postRouter = Router();
// add post
postRouter
  .use(verfifyToken,protectRoutes)
  .post("/addPost",validate(addPost),uploadSingleFile("posts", "content"),addPost)
  .post("/:id/addCommnet",addComment)
  .get("/allPosts", validate(getAllPostsVal),getAllPosts)
  .get("/unFinished-posts",validate(getUnFinisedPostsVal) ,getUnFinishedPosts)
  .patch("/edit-post/:id", validate(editPostVal),editPost)
  .delete("/delete-post/:id", validate(deletePostVal),deletePost);
