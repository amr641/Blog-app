"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.getAllPosts = exports.addPost = void 0;
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
const postModel_1 = require("../../../database/models/postModel");
const appError_1 = require("../../utils/appError");
const addPost = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    let post = yield postModel_1.Post.create(req.body);
    res.status(201).json({ message: "success", post });
}));
exports.addPost = addPost;
const getAllPosts = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = yield postModel_1.Post.find();
    res.status(200).json({ message: "success", posts });
}));
exports.getAllPosts = getAllPosts;
const editPost = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let post = yield postModel_1.Post.findById(req.params.id);
    if ((post === null || post === void 0 ? void 0 : post.user) !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId))
        return next(new appError_1.AppError("un authorized", 403));
    yield postModel_1.Post.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "success", post });
}));
exports.editPost = editPost;
const deletePost = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let post = yield postModel_1.Post.findById(req.params.id);
    if ((post === null || post === void 0 ? void 0 : post.user) !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId))
        return next(new appError_1.AppError("un authorized", 403));
    yield postModel_1.Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "success", post });
}));
exports.deletePost = deletePost;
