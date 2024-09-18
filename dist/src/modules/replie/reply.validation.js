"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReplyVal = exports.editReplyVal = exports.replytoCommentVal = void 0;
const joi_1 = __importDefault(require("joi"));
const replytoCommentVal = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
    content: joi_1.default.string().required()
});
exports.replytoCommentVal = replytoCommentVal;
const editReplyVal = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
    content: joi_1.default.string()
});
exports.editReplyVal = editReplyVal;
const deleteReplyVal = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
});
exports.deleteReplyVal = deleteReplyVal;
