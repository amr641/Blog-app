"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const mongoose_1 = require("mongoose");
const replySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    edited: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: true
    },
});
exports.Reply = (0, mongoose_1.model)("Reply", replySchema);
