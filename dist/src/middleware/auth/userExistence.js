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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExistence = void 0;
const userModel_1 = require("../../../database/models/userModel");
const appError_1 = require("../../utils/appError");
const emailExistence = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.User.findOne({ email: req.body.email });
    if (user)
        console.log("user exist");
    if (!user)
        return next();
    return next(new appError_1.AppError("userAlredy exist please sign in", 409));
});
exports.emailExistence = emailExistence;
