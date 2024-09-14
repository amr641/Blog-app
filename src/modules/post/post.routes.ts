import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addPost,getAllPosts,editPost, deletePost } from "./post.controller";

export const postRouter= Router();
// add post
postRouter
.use(verfifyToken)
.post("/addPost",addPost)
.get("/allPosts",getAllPosts)
.patch("/edit-post/:id",editPost)
.delete("/delete-post/:id",deletePost)
