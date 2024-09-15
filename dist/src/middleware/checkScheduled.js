"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScheduledPosts = void 0;
const catchErrors_1 = require("./errorHandeling/catchErrors");
const postModel_1 = require("../../database/models/postModel");
exports.checkScheduledPosts = (0, catchErrors_1.catchError)(async (req, res, next) => {
    let posts = await postModel_1.Post.find({ scheduled: true });
    posts.map(async (ele) => {
        ele.finished = ele.publishDate <= new Date();
        await ele.save();
    });
    next();
});
