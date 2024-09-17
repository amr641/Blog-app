"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userExistence_1 = require("../../middleware/auth/userExistence");
const fileUpload_1 = require("../../fileUpload/fileUpload");
const verifiyToken_1 = require("../../middleware/verifiyToken");
const checkScheduled_1 = require("../../middleware/checkScheduled");
const auth_1 = require("../../middleware/auth/auth");
exports.userRouter = (0, express_1.Router)();
exports.userRouter
    .post("/signup", (0, fileUpload_1.uploadSingleFile)("user", "avatar"), userExistence_1.emailExistence, user_controller_1.signUp)
    .post("/signin", checkScheduled_1.checkScheduledPosts, user_controller_1.login)
    .use(verifiyToken_1.verfifyToken)
    .patch("/update-profile", (0, fileUpload_1.uploadSingleFile)("user", "avatar"), user_controller_1.updateUserProfile)
    .patch("/change-password", auth_1.changeUserPassword)
    .delete("/delete-profile", user_controller_1.deleteUserProfile);
