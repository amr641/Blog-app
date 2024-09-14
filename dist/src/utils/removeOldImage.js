"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldImage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const removeOldImage = function (image) {
    let filePath = path_1.default.resolve() + "/src/uploads/user/" + image;
    console.log(filePath);
    fs_1.default.unlinkSync(filePath);
};
exports.removeOldImage = removeOldImage;
