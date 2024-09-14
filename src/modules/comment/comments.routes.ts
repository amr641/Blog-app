import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { deleteComment, editComment } from "./commentController";

export const commentRouter = Router();
commentRouter
  .use(verfifyToken)
  .route("/:id")
  .patch(editComment)
  .delete(deleteComment);
