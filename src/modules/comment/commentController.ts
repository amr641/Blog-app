import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middleware/errorHandeling/catchErrors";
import { Post } from "../../../database/models/postModel";
import { Comment } from "../../../database/models/commentModel";
import { AppError } from "../../utils/appError";
// add comment
const addComment = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let addedComment = await Comment.create({
      user: req.user?.userId,
      content: req.body.content,
    });

    let post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: addedComment._id } },
      { new: true }
    ).populate("comments");
    console.log(req.params);
    console.log(post);
    res.status(201).json({ message: "success", post });
  }
);
const editComment = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let comment = await Comment.findById(req.params.id);
    if (!comment) return next(new AppError("not found", 404));
        // ensure only the owner can delete or update his replies

    if (String(comment?.user) !== req.user?.userId)
      return next(new AppError("un authorized", 401));
    await Comment.updateOne({_id:comment._id},{content:req.body.content,edited:true})

    res.status(200).json({ message: "success", comment });
  }
);
const deleteComment = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let comment = await Comment.findById(req.params.id);
    if (!comment) return next(new AppError("not found", 404));
        // ensure only the owner can delete or update his replies

    if (String(comment?.user) !== req.user?.userId)
      return next(new AppError("un authorized", 401));
    await Comment.deleteOne({_id:comment._id})

    res.status(200).json({ message: "success"});
  }
);
export { addComment, editComment,deleteComment };
