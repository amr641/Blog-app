import { Router } from "express";
import { verfifyToken } from "../../middleware/verifiyToken";
import { editReply, deleteReply, replyToComment } from "./replyController";
import { protectRoutes } from "../../middleware/auth/auth";

export const replyRouter = Router();
replyRouter
  .use(verfifyToken,protectRoutes)
  .route("/:id")
  .post(replyToComment)
  .patch(editReply)
  .delete(deleteReply);
