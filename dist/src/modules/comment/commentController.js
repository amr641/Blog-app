"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.editComment = exports.addComment = void 0;
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
const postModel_1 = require("../../../database/models/postModel");
const commentModel_1 = require("../../../database/models/commentModel");
const appError_1 = require("../../utils/appError");
// add comment
const addComment = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let addedComment = await commentModel_1.Comment.create({
        user: req.user?.userId,
        content: req.body.content,
    });
    let post = await postModel_1.Post.findByIdAndUpdate(req.params.postId, { $push: { comments: addedComment._id } }, { new: true }).populate("comments");
    if (!post)
        return next(new appError_1.AppError("post not found", 404));
    res.status(201).json({ message: "success", post });
});
exports.addComment = addComment;
const editComment = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let comment = await commentModel_1.Comment.findById(req.params.id);
    if (!comment)
        return next(new appError_1.AppError("not found", 404));
    // ensure only the owner can delete or update his replies
    if (String(comment?.user) !== req.user?.userId)
        return next(new appError_1.AppError("un authorized", 401));
    await commentModel_1.Comment.updateOne({ _id: comment._id }, { content: req.body.content, edited: true });
    res.status(200).json({ message: "success", comment });
});
exports.editComment = editComment;
const deleteComment = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let comment = await commentModel_1.Comment.findById(req.params.id);
    if (!comment)
        return next(new appError_1.AppError("not found", 404));
    // ensure only the owner can delete or update his replies
    if (String(comment?.user) !== req.user?.userId)
        return next(new appError_1.AppError("un authorized", 401));
    await commentModel_1.Comment.deleteOne({ _id: comment._id });
    res.status(200).json({ message: "success" });
});
exports.deleteComment = deleteComment;
