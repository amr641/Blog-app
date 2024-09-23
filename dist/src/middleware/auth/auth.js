"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoutes = exports.changeUserPassword = void 0;
const userModel_1 = require("../../../database/models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = require("../../utils/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchErrors_1 = require("../errorHandeling/catchErrors");
const changeUserPassword = async (req, res, next) => {
    const user = await userModel_1.User.findById(req.user?.userId);
    // compare old password with the provided one.
    if (!user || !bcrypt_1.default.compareSync(req.body.oldPassword, user.password))
        return next(new appError_1.AppError("your oldPassword is incorrect", 401));
    // hash the new password
    req.body.newPassword = bcrypt_1.default.hashSync(req.body.newPassword, 8);
    // add the changed date
    // update and insert it into dataBase
    await userModel_1.User.updateOne({ _id: req.user?.userId }, {
        password: req.body.newPassword,
        passwordChangedTime: Date.now(),
    });
    let token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_KEY);
    res.status(201).json({ message: "password changed successfully", token });
};
exports.changeUserPassword = changeUserPassword;
const protectRoutes = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let user = await userModel_1.User.findById(req.user?.userId);
    if (!user)
        return next(new appError_1.AppError("user not found", 404));
    // user must be online
    if (!user.status)
        return next(new appError_1.AppError("login first", 409));
    // seconds==>millie seconds ==> Date
    const secondsToDate = (seconds) => new Date(seconds * 1000);
    if (secondsToDate(req.user?.iat) < user?.passwordChangedTime)
        return next(new appError_1.AppError("expired token..login again", 409));
    next();
});
exports.protectRoutes = protectRoutes;
