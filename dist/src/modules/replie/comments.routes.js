"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const verifiyToken_1 = require("../../middleware/verifiyToken");
const replieController_1 = require("./replieController");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter
    .use(verifiyToken_1.verfifyToken)
    .route("/:id")
    .patch(replieController_1.editComment)
    .delete(replieController_1.deleteComment);
