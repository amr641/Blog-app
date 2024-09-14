"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    content: String,
    category: String,
    tags: [String],
    drafts: {
        type: Boolean,
        default: true
    },
    comments: {
        type: mongoose_1.Types.ObjectId,
        ref: "Comment",
    },
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
