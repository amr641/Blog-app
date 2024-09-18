"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostVal = exports.editPostVal = exports.getUnFinisedPostsVal = exports.getAllPostsVal = exports.addPostVal = void 0;
const Joi_1 = __importDefault(require("Joi"));
const addPostVal = Joi_1.default.object({
    user: Joi_1.default.string().hex().length(24),
    title: Joi_1.default.string().required(),
    category: Joi_1.default.string().required(),
    tags: Joi_1.default.array().items(Joi_1.default.string()),
    finished: Joi_1.default.boolean(),
    scheduled: Joi_1.default.boolean(),
    publishDate: Joi_1.default.date(),
    content: Joi_1.default.alternatives().try(Joi_1.default
        .object({
        fieldname: Joi_1.default.string().required(),
        originalname: Joi_1.default.string().required(),
        encoding: Joi_1.default.string().required(),
        mimetype: Joi_1.default
            .string()
            .required()
            .valid("image/jpeg", "image/png", "image/jpg", "video/mp4"),
        size: Joi_1.default.number().required(),
        destination: Joi_1.default.string().required(),
        filename: Joi_1.default.string().required(),
        path: Joi_1.default.string().required(),
    }), Joi_1.default.string().min(5))
        .required(),
});
exports.addPostVal = addPostVal;
const getAllPostsVal = Joi_1.default.object({
    search: Joi_1.default.string()
});
exports.getAllPostsVal = getAllPostsVal;
const getUnFinisedPostsVal = Joi_1.default.object({});
exports.getUnFinisedPostsVal = getUnFinisedPostsVal;
const editPostVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required(),
    title: Joi_1.default.string(),
    category: Joi_1.default.string(),
    tags: Joi_1.default.array().items(Joi_1.default.string()),
    finished: Joi_1.default.boolean(),
    scheduled: Joi_1.default.boolean(),
    publishDate: Joi_1.default.date(),
    content: Joi_1.default
        .object({
        fieldname: Joi_1.default.string(),
        originalname: Joi_1.default.string(),
        encoding: Joi_1.default.string(),
        mimetype: Joi_1.default
            .string()
            .required()
            .valid("image/jpeg", "image/png", "image/jpg", "video/mp4"),
        size: Joi_1.default.number().required(),
        destination: Joi_1.default.string().required(),
        filename: Joi_1.default.string().required(),
        path: Joi_1.default.string().required(),
    })
});
exports.editPostVal = editPostVal;
const deletePostVal = Joi_1.default.object({
    id: Joi_1.default.string().hex().length(24).required()
});
exports.deletePostVal = deletePostVal;
