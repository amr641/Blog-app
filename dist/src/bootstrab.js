"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrab = void 0;
const user_routes_1 = require("./modules/user/user.routes");
const globalHandeling_1 = require("./middleware/errorHandeling/globalHandeling");
const post_routes_1 = require("./modules/post/post.routes");
const comments_routes_1 = require("./modules/comment/comments.routes");
const reply_routes_1 = require("./modules/replie/reply.routes");
const socialNetworkLogin_1 = __importDefault(require("./modules/user/socialNetworkLogin"));
const bootstrab = function (app) {
    app.use('/users', user_routes_1.userRouter);
    app.use('/posts', post_routes_1.postRouter);
    app.use('/comments', comments_routes_1.commentRouter);
    app.use('/replies', reply_routes_1.replyRouter);
    app.use(socialNetworkLogin_1.default);
    app.use(globalHandeling_1.globalHandeling);
};
exports.bootstrab = bootstrab;
