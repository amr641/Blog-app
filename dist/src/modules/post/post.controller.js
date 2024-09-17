"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnFinishedPosts = exports.deletePost = exports.editPost = exports.getAllPosts = exports.addPost = void 0;
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
const postModel_1 = require("../../../database/models/postModel");
const appError_1 = require("../../utils/appError");
const apiFeatures_1 = require("../../utils/apiFeatures");
const addPost = (0, catchErrors_1.catchError)(async (req, res, next) => {
    req.body.user = req.user?.userId;
    req.body.content = req.file?.filename;
    let post = await postModel_1.Post.create(req.body);
    res.status(201).json({ message: "success", post });
});
exports.addPost = addPost;
const getAllPosts = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let apiFeatuers = new apiFeatures_1.ApiFeatuers(postModel_1.Post.find({ finished: true }), req.query)
        .search();
    let posts = await apiFeatuers.mongooseQuery;
    res.status(200).json({ message: "success", posts });
});
exports.getAllPosts = getAllPosts;
const getUnFinishedPosts = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let posts = await postModel_1.Post.find({ finished: false, user: req.user?.userId });
    res.status(200).json({ [`your posts`]: posts });
});
exports.getUnFinishedPosts = getUnFinishedPosts;
const editPost = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let post = await postModel_1.Post.findById(req.params.id);
    if (post?.user !== req.user?.userId)
        return next(new appError_1.AppError("un authorized", 403));
    await postModel_1.Post.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "success", post });
});
exports.editPost = editPost;
const deletePost = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let post = await postModel_1.Post.findById(req.params.id);
    if (post?.user !== req.user?.userId)
        return next(new appError_1.AppError("un authorized", 403));
    await postModel_1.Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "success", post });
});
exports.deletePost = deletePost;
