import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { editReply, deleteReply, replyToComment } from "./replyController";

export const replyRouter = Router();
replyRouter
  .use(verfifyToken)
  .route("/:id")
  .post(replyToComment)
  .patch(editReply)
  .delete(deleteReply);
