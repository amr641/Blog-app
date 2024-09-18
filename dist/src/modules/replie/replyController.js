"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReply = exports.editReply = exports.replyToComment = void 0;
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
const commentModel_1 = require("../../../database/models/commentModel");
const appError_1 = require("../../utils/appError");
const repliesModel_1 = require("../../../database/models/repliesModel");
// add comment
const replyToComment = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let addReplie = await repliesModel_1.Reply.create({
        user: req.user?.userId,
        content: req.body.content,
    });
    // passing the comment id into params
    let comment = await commentModel_1.Comment.findByIdAndUpdate(req.params.id, { $push: { replies: addReplie._id } }, { new: true }).populate("replies");
    if (!comment)
        return next(new appError_1.AppError("commnet not found", 404));
    res.status(201).json({ message: "success", comment });
});
exports.replyToComment = replyToComment;
const editReply = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let reply = await repliesModel_1.Reply.findById(req.params.id);
    if (!reply)
        return next(new appError_1.AppError("not found", 404));
    // ensure only the owner can delete or update his replies
    if (String(reply?.user) !== req.user?.userId)
        return next(new appError_1.AppError("un authorized", 401));
    await repliesModel_1.Reply.updateOne({ _id: reply._id }, { content: req.body.content, edited: true });
    res.status(200).json({ message: "success", reply });
});
exports.editReply = editReply;
const deleteReply = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let reply = await repliesModel_1.Reply.findById(req.params.id);
    if (!reply)
        return next(new appError_1.AppError("not found", 404));
    // ensure only the owner can delete or update his replies
    if (String(reply?.user) !== req.user?.userId)
        return next(new appError_1.AppError("un authorized", 401));
    await reply.deleteOne({ _id: reply._id });
    res.status(200).json({ message: "success" });
});
exports.deleteReply = deleteReply;
