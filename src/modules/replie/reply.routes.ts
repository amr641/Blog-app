import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { editReply, deleteReply, replyToComment } from "./replyController";
import { protectRoutes } from "../../middleware/auth/auth";
import validate from "../../middleware/validate";
import {
  deleteReplyVal,
  editReplyVal,
  replytoCommentVal,
} from "./replyValidator";

export const replyRouter = Router();
replyRouter
  .use(verfifyToken, protectRoutes)
  .route("/:id")
  .post(validate(replytoCommentVal), replyToComment)
  .patch(validate(editReplyVal), editReply)
  .delete(validate(deleteReplyVal), deleteReply);
