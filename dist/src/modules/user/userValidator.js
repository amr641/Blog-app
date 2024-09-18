"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileVal = exports.changePasswordVal = exports.updateProfileVal = exports.signInVal = exports.signupVal = void 0;
const Joi_1 = __importDefault(require("Joi"));
const signupVal = Joi_1.default.object({
    name: Joi_1.default.string().min(5).max(30).required(),
    email: Joi_1.default.string().email().required(),
    password: Joi_1.default.string()
        .pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/)
        .required(),
    bio: Joi_1.default.string(),
    preferences: Joi_1.default.string(),
    avatar: Joi_1.default.object({
        fieldname: Joi_1.default.string().required(),
        originalname: Joi_1.default.string().required(),
        encoding: Joi_1.default.string().required(),
        mimetype: Joi_1.default.string()
            .required()
            .valid("image/jpeg", "image/png", "image/jpg"),
        size: Joi_1.default.number().required(),
        destination: Joi_1.default.string().required(),
        filename: Joi_1.default.string().required(),
        path: Joi_1.default.string().required(),
    }).required(),
});
exports.signupVal = signupVal;
const signInVal = Joi_1.default.object({
    email: Joi_1.default.string().email().required(),
    password: Joi_1.default.string().required(),
});
exports.signInVal = signInVal;
const updateProfileVal = Joi_1.default.object({
    name: Joi_1.default.string().min(5).max(30),
    email: Joi_1.default.string().email(),
    bio: Joi_1.default.string(),
    preferences: Joi_1.default.string(),
    file: Joi_1.default.object({
        fieldname: Joi_1.default.string().required(),
        originalname: Joi_1.default.string().required(),
        encoding: Joi_1.default.string().required(),
        mimetype: Joi_1.default.string()
            .required()
            .valid("image/jpeg", "image/png", "image/jpg"),
        size: Joi_1.default.number().required(),
        destination: Joi_1.default.string().required(),
        filename: Joi_1.default.string().required(),
        path: Joi_1.default.string().required(),
    }),
});
exports.updateProfileVal = updateProfileVal;
const changePasswordVal = Joi_1.default.object({
    oldPassword: Joi_1.default.string()
        .pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/)
        .required(),
    newPassword: Joi_1.default.string()
        .pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/)
        .required(),
    confirmNewPassword: Joi_1.default.valid(Joi_1.default.ref("newPassword")).required(),
});
exports.changePasswordVal = changePasswordVal;
const deleteProfileVal = Joi_1.default.object({});
exports.deleteProfileVal = deleteProfileVal;
