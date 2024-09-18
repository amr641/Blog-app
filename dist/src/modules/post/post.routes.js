"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const verifiyToken_1 = require("../../middleware/verifiyToken");
const post_controller_1 = require("./post.controller");
const fileUpload_1 = require("../../fileUpload/fileUpload");
const auth_1 = require("../../middleware/auth/auth");
const validate_1 = __importDefault(require("../../middleware/validate"));
const postValidator_1 = require("./postValidator");
exports.postRouter = (0, express_1.Router)();
// add post
exports.postRouter
    .use(verifiyToken_1.verfifyToken, auth_1.protectRoutes)
    .post("/addPost", (0, validate_1.default)(postValidator_1.addPostVal), (0, fileUpload_1.uploadSingleFile)("posts", "content"), post_controller_1.addPost)
    .get("/allPosts", post_controller_1.getAllPosts)
    .get("/unFinished-posts", post_controller_1.getUnFinishedPosts)
    .patch("/edit-post/:id", (0, fileUpload_1.uploadSingleFile)("posts", "content"), (0, validate_1.default)(postValidator_1.editPostVal), post_controller_1.editPost)
    .delete("/delete-post/:id", post_controller_1.deletePost);
