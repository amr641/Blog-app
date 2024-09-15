"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyRouter = void 0;
const express_1 = require("express");
const verifiyToken_1 = require("../../middleware/verifiyToken");
const replieController_1 = require("./replieController");
exports.replyRouter = (0, express_1.Router)();
exports.replyRouter
    .use(verifiyToken_1.verfifyToken)
    .route("/:id")
    .post(replieController_1.replieToComment)
    .patch(replieController_1.editReply)
    .delete(replieController_1.deleteReply);
