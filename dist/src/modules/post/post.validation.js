"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostVal = exports.editPostVal = exports.getUnFinisedPostsVal = exports.getAllPostsVal = exports.addPostVal = void 0;
const joi_1 = __importDefault(require("joi"));
const addPostVal = joi_1.default.object({
    title: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    finished: joi_1.default.boolean(),
    scheduled: joi_1.default.boolean(),
    publishDate: joi_1.default.date(),
    file: joi_1.default
        .object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default
            .string()
            .required()
            .valid("image/jpeg", "image/png", "image/jpg"),
        size: joi_1.default.number().required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    })
        .required(),
});
exports.addPostVal = addPostVal;
const getAllPostsVal = joi_1.default.object({});
exports.getAllPostsVal = getAllPostsVal;
const getUnFinisedPostsVal = joi_1.default.object({});
exports.getUnFinisedPostsVal = getUnFinisedPostsVal;
const editPostVal = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
    title: joi_1.default.string(),
    category: joi_1.default.string(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    finished: joi_1.default.boolean(),
    scheduled: joi_1.default.boolean(),
    publishDate: joi_1.default.date(),
    file: joi_1.default
        .object({
        fieldname: joi_1.default.string(),
        originalname: joi_1.default.string(),
        encoding: joi_1.default.string(),
        mimetype: joi_1.default
            .string()
            .required()
            .valid("image/jpeg", "image/png", "image/jpg"),
        size: joi_1.default.number().required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    })
});
exports.editPostVal = editPostVal;
const deletePostVal = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required()
});
exports.deletePostVal = deletePostVal;
