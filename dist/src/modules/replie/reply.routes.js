"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyRouter = void 0;
const express_1 = require("express");
const verifiyToken_1 = require("../../middleware/verifiyToken");
const replyController_1 = require("./replyController");
const auth_1 = require("../../middleware/auth/auth");
const validate_1 = __importDefault(require("../../middleware/validate"));
const replyValidator_1 = require("./replyValidator");
exports.replyRouter = (0, express_1.Router)();
exports.replyRouter
    .use(verifiyToken_1.verfifyToken, auth_1.protectRoutes)
    .route("/:id")
    .post((0, validate_1.default)(replyValidator_1.replytoCommentVal), replyController_1.replyToComment)
    .patch((0, validate_1.default)(replyValidator_1.editReplyVal), replyController_1.editReply)
    .delete((0, validate_1.default)(replyValidator_1.deleteReplyVal), replyController_1.deleteReply);
