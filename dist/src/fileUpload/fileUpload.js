"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleFile = exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const appError_1 = require("../utils/appError");
const fileUpload = (folderName) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `src/uploads/${folderName}`);
        },
        filename: (req, file, cb) => {
            cb(null, (0, uuid_1.v4)() + "-" + file.originalname);
        },
    });
    const fileFilter = (req, file, cb) => {
        const { mimetype } = file;
        if (mimetype.startsWith("image"))
            return cb(null, true);
        cb(new appError_1.AppError(`only image allowed`, 403), false);
    };
    const upload = (0, multer_1.default)({
        fileFilter,
        storage,
        limits: {
            fileSize: 4 * 1024 * 1024,
        },
    });
    return upload;
};
exports.fileUpload = fileUpload;
const uploadSingleFile = (folderName, fieldName) => (0, exports.fileUpload)(folderName).single(fieldName);
exports.uploadSingleFile = uploadSingleFile;
