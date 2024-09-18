"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    bio: String,
    prefernces: String,
    passwordChangedTime: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: false,
    },
    accountId: String,
    provider: String
});
userSchema.post("find", function (doc) {
    let url = process.env.BASE_URL + "/user";
    doc.avatar = url + doc.avatar;
});
exports.User = (0, mongoose_1.model)("User", userSchema);
