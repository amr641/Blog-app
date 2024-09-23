"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookRouter = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
const express_1 = require("express");
const express_session_1 = __importDefault(require("express-session"));
const userModel_1 = require("../../../database/models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../../utils/appError");
const postModel_1 = require("../../../database/models/postModel");
// Initialize Facebook Router
exports.facebookRouter = (0, express_1.Router)();
// Session Setup
exports.facebookRouter.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized: true,
}));
// Initialize Passport
exports.facebookRouter.use(passport_1.default.initialize());
exports.facebookRouter.use(passport_1.default.session());
// Serialize user into session
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
// Deserialize user from session
passport_1.default.deserializeUser(function (obj, done) {
    done(null, obj);
});
// postman-to-openapi 'D:\projects\Blog-app\blog.postman_collection.json' -o 'path/to/swagger-doc.yaml' --yaml
// Configure Facebook Strategy
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID || "347803424993032", // Use environment variables for security
    clientSecret: process.env.FACEBOOK_APP_SECRET || "afa180595ae501d79d699eb39c1f6ef9", // Avoid hard-coding secrets
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "displayName", "email"], // Fetch required fields
}, async function (accessToken, refreshToken, profile, done) {
    try {
        let user = await userModel_1.User.findOne({
            accountId: profile.id,
            provider: "facebook",
        });
        // If user doesn't exist, create new user
        if (!user) {
            user = new userModel_1.User({
                accountId: profile.id,
                name: profile.displayName,
                provider: "facebook",
            });
            await user.save();
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
// Route to start Facebook login with scope
exports.facebookRouter.get("/auth/facebook", passport_1.default.authenticate("facebook"));
// Callback route once Facebook authentication is done
exports.facebookRouter.get("/auth/facebook/callback", (0, catchErrors_1.catchError)(async (req, res, next) => {
    passport_1.default.authenticate("facebook", async (err, user) => {
        if (err) {
            return next(new appError_1.AppError("Facebook Authentication Failed", 500)); // Handle error properly
        }
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" }); // Handle case when authentication fails
        }
        // Fetch user from DB
        let acc = await userModel_1.User.findOne({ accountId: user.accountId });
        if (!acc) {
            return next(new appError_1.AppError("user not found", 404));
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ name: acc.name, userId: acc._id }, process.env.JWT_KEY, { expiresIn: "1h" } // Token expiry for security
        );
        acc.status = true;
        await acc.save();
        // posts
        let posts = await postModel_1.Post.find({ finished: true })
            .populate({
            path: "comments", // Populate comments
            populate: {
                // Nested populate for replies in each comment
                path: "replies", // Populate replies inside comments
                model: "Reply", // Specify the model for replies
                populate: {
                    path: "user", // You can further populate the 'user' who posted the reply
                    select: "name -_id", // Optional: Select fields like 'name' of the user
                },
            },
        })
            .populate("comments.user", "name");
        // Successful authentication, send token
        // console.log(user);
        res
            .status(200)
            .json({ message: `welcome back ${acc.name}`, token, posts });
    })(req, res, next); // Execute passport authentication
}));
