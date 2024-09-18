"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileVal = exports.changePasswordVal = exports.updateProfileVal = exports.signInVal = exports.signupVal = void 0;
const joi_1 = __importDefault(require("joi"));
const signupVal = joi_1.default.object({
    name: joi_1.default.string().min(5).max(30).required(),
    email: joi_1.default.string().email().required(),
    passowrd: joi_1.default.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    rePassword: joi_1.default.valid(joi_1.default.ref('passowrd')).required(),
    bio: joi_1.default.string(),
    preferences: joi_1.default.string(),
    file: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().required().valid('image/jpeg', 'image/png', 'image/jpg'),
        size: joi_1.default.number().required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required()
    }).required()
});
exports.signupVal = signupVal;
const signInVal = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    passowrd: joi_1.default.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required()
});
exports.signInVal = signInVal;
const updateProfileVal = joi_1.default.object({
    name: joi_1.default.string().min(5).max(30),
    email: joi_1.default.string().email(),
    bio: joi_1.default.string(),
    preferences: joi_1.default.string(),
    file: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().required().valid('image/jpeg', 'image/png', 'image/jpg'),
        size: joi_1.default.number().required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required()
    })
});
exports.updateProfileVal = updateProfileVal;
const changePasswordVal = joi_1.default.object({
    oldPassword: joi_1.default.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    newPassword: joi_1.default.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    confirmNewPassword: joi_1.default.valid(joi_1.default.ref('newPassword')).required()
});
exports.changePasswordVal = changePasswordVal;
const deleteProfileVal = joi_1.default.object({});
exports.deleteProfileVal = deleteProfileVal;
