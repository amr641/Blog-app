"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const verifiyToken_1 = require("../../middleware/verifiyToken");
const commentController_1 = require("./commentController");
const auth_1 = require("../../middleware/auth/auth");
const validate_1 = __importDefault(require("../../middleware/validate"));
const commentValidator_1 = require("./commentValidator");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter
    .use(verifiyToken_1.verfifyToken, auth_1.protectRoutes)
    .post("/:postId", (0, validate_1.default)(commentValidator_1.addCommentVal), commentController_1.addComment)
    .route("/:id")
    .patch((0, validate_1.default)(commentValidator_1.editCommentVal), commentController_1.editComment)
    .delete((0, validate_1.default)(commentValidator_1.deleteCommentVal), commentController_1.deleteComment);
