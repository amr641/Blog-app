import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middleware/errorHandeling/catchErrors";
import { Post } from "../../../database/models/postModel";
import { Comment } from "../../../database/models/commentModel";
import { AppError } from "../../utils/appError";
import { Reply } from "../../../database/models/repliesModel";
// add comment
const replyToComment = catchError(
  async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    let addReplie = await Reply.create({
      user: req.user?.userId,
      content: req.body.content,
    });
// passing the comment id into params
    let comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: addReplie._id } },
      { new: true }
    ).populate("replies")

    res.status(201).json({ message: "success", comment });
  }
);
const editReply = catchError(
  async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    let reply = await Reply.findById(req.params.id);
    if (!reply) return next(new AppError("not found", 404));
        // ensure only the owner can delete or update his replies
    if (String(reply?.user) !== req.user?.userId)
      return next(new AppError("un authorized", 401));
    await Reply.updateOne({_id:reply._id},{content:req.body.content,edited:true})

    res.status(200).json({ message: "success", reply });
  }
);
const deleteReply = catchError(
  async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    let reply = await Reply.findById(req.params.id);
    if (!reply) return next(new AppError("not found", 404));
    // ensure only the owner can delete or update his replies
    if (String(reply?.user) !== req.user?.userId)
      return next(new AppError("un authorized", 401));
    await reply.deleteOne({_id:reply._id})
    res.status(200).json({ message: "success"});
  }
);
export { replyToComment, editReply,deleteReply };
