"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentVal = exports.editCommentVal = exports.addCommentVal = void 0;
const Joi_1 = __importDefault(require("Joi"));
const addCommentVal = Joi_1.default.object({
    postId: Joi_1.default.string().hex().length(24).required(),
    content: Joi_1.default.string().required(),
});
exports.addCommentVal = addCommentVal;
const editCommentVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required(),
    content: Joi_1.default.string(),
});
exports.editCommentVal = editCommentVal;
const deleteCommentVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required(),
});
exports.deleteCommentVal = deleteCommentVal;
