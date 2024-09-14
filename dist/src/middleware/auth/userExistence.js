"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExistence = void 0;
const userModel_1 = require("../../../database/models/userModel");
const appError_1 = require("../../utils/appError");
const emailExistence = async (req, res, next) => {
    let user = await userModel_1.User.findOne({ email: req.body.email });
    if (user)
        console.log("user exist");
    if (!user)
        return next();
    return next(new appError_1.AppError("userAlredy exist please sign in", 409));
};
exports.emailExistence = emailExistence;
