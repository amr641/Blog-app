import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { addComment, deleteComment, editComment } from "./commentController";
import { protectRoutes } from "../../middleware/auth/auth";
import validate from "../../middleware/validate";
import {
  addCommentVal,
  deleteCommentVal,
  editCommentVal,
} from "./commentValidator";

export const commentRouter = Router();
commentRouter
  .use(verfifyToken, protectRoutes)
  .post("/:postId", validate(addCommentVal), addComment)
  .route("/:id")
  .patch(validate(editCommentVal), editComment)
  .delete(validate(deleteCommentVal), deleteComment);
