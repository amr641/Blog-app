"use strict";
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
const signUp = (0, catchErrors_1.catchError)(async (req, res, next) => {
    req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
    req.body.avatar = req.file?.filename;
    let user = await userModel_1.User.create(req.body);
    let token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_KEY);
    return res.status(201).json({ message: "success", token });
});
exports.signUp = signUp;
const login = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await userModel_1.User.findOne({ email: req.body.email });
    if (!user || !bcrypt_1.default.compare(req.body.password, user.password))
        return next(new appError_1.AppError("incorrect email or password", 403));
    let token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_KEY);
    let posts = await postModel_1.Post.find({ finished: true })
        .populate({
        path: "comments", // Populate comments
        populate: {
            // Nested populate for replies in each comment
            path: "replies", // Populate replies inside comments
            model: "Reply", // Specify the model for replies
            populate: {
                path: "user", // You can further populate the 'user' who posted the reply
                select: "name -_id", // Optional: Select fields like 'name' of the user
            },
        },
    })
        .populate("comments.user", "name");
    return res
        .status(201)
        .json({ message: `welcome back ${user.name}`, token, posts });
});
exports.login = login;
// only the user can update his profile
const updateUserProfile = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await userModel_1.User.findByIdAndUpdate(req.user.userId, req.body);
    if (!user)
        return next(new appError_1.AppError("user not found please register", 404));
    if (req.file) {
        req.body.avatar = req.file.filename;
        (0, removeOldImage_1.removeOldImage)(user?.avatar);
    }
    res.status(201).json({ message: "success" });
});
exports.updateUserProfile = updateUserProfile;
// delete user profile
const deleteUserProfile = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await userModel_1.User.findByIdAndDelete(req.user.userId);
    user || next(new appError_1.AppError("user not found", 404));
    !user || res.status(200).json({ message: "deleted successfully" });
});
exports.deleteUserProfile = deleteUserProfile;
