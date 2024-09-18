"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReplyVal = exports.editReplyVal = exports.replytoCommentVal = void 0;
const Joi_1 = __importDefault(require("Joi"));
const replytoCommentVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required(),
    content: Joi_1.default.string().required()
});
exports.replytoCommentVal = replytoCommentVal;
const editReplyVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required(),
    content: Joi_1.default.string()
});
exports.editReplyVal = editReplyVal;
const deleteReplyVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required(),
});
exports.deleteReplyVal = deleteReplyVal;
