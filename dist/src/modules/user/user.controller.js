"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserProfile = exports.updateUserProfile = exports.login = exports.signUp = void 0;
const userModel_1 = require("../../../database/models/userModel");
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = require("../../utils/appError");
const removeOldImage_1 = require("../../utils/removeOldImage");
const postModel_1 = require("../../../database/models/postModel");
const signUp = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
    req.body.avatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    let user = yield userModel_1.User.create(req.body);
    let token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, "amoor");
    return res.status(201).json({ message: "success", token });
}));
exports.signUp = signUp;
const login = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let user = yield userModel_1.User.findOne({ email: req.body.email });
    if (!user || !bcrypt_1.default.compare(req.body.password, user.password))
        return next(new appError_1.AppError("incorrect email or password", 403));
    let token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, "amoor");
    let posts = yield postModel_1.Post.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
    return res
        .status(201)
        .json({ message: "loggedin...", token, ["your posts"]: posts });
}));
exports.login = login;
// only the user can update his profile
const updateUserProfile = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.User.findByIdAndUpdate(req.user.userId, req.body);
    if (!user)
        return next(new appError_1.AppError("user not found please register", 404));
    if (req.file) {
        req.body.avatar = req.file.filename;
        (0, removeOldImage_1.removeOldImage)(user === null || user === void 0 ? void 0 : user.avatar);
    }
    res.status(201).json({ message: "success" });
}));
exports.updateUserProfile = updateUserProfile;
// delete user profile
const deleteUserProfile = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.User.findByIdAndDelete(req.user.userId);
    user || next(new appError_1.AppError("user not found", 404));
    !user || res.status(200).json({ message: "deleted successfully" });
}));
exports.deleteUserProfile = deleteUserProfile;
