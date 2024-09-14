"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    constent: String,
    category: String,
    tags: [String],
    comments: {
        type: mongoose_1.Types.ObjectId,
        ref: "Comment",
    },
});
exports.Comment = (0, mongoose_1.model)("Post", postSchema);
