import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { deleteComment, editComment } from "./commentController";
import { protectRoutes } from "../../middleware/auth/auth";

export const commentRouter = Router();
commentRouter
  .use(verfifyToken,protectRoutes)
  .route("/:id")
  .patch(editComment)
  .delete(deleteComment);
