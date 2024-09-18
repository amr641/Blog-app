"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true, min: 1, max: 50 },
    content: {
        type: String,
        required: true
    },
    category: String,
    tags: [String],
    finished: {
        type: Boolean,
        default: true,
    },
    scheduled: {
        type: Boolean,
        default: false,
    },
    publishDate: {
        type: Date,
        default: Date.now(),
    },
    comments: [{ type: mongoose_1.Types.ObjectId, ref: "Comment" }],
});
postSchema.post("find", function (doc) {
    let url = process.env.BASE_URL + "/posts/";
    doc.content = url + doc.content;
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
