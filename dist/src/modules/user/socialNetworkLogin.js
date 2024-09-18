"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const userModel_1 = require("../../../database/models/userModel");
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const express_1 = require("express");
const FacebookStrategy = passport_facebook_1.default.Strategy;
const facebookRouter = (0, express_1.Router)();
require("dotenv/config");
const appError_1 = require("../../utils/appError");
const catchErrors_1 = require("../../middleware/errorHandeling/catchErrors");
passport_1.default.use(new FacebookStrategy({
    clientID: '894388332019012',
    clientSecret: 'f3ec0038f9c5e5bff630f117bcf799c5',
    callbackURL: 'http://localhost:3000/',
}, async function (profile, cb) {
    const user = await userModel_1.User.findOne({
        accountId: profile.id,
        provider: 'facebook',
    });
    if (!user) {
        console.log('Adding new facebook user to DB..');
        const user = new userModel_1.User({
            accountId: profile.id,
            name: profile.displayName,
            provider: profile.provider,
        });
        await user.save();
        // console.log(user);
        return cb(null, profile);
    }
    else {
        console.log('Facebook User already exist in DB..');
        // console.log(profile);
        return cb(null, profile);
    }
}));
facebookRouter.get('/facebook', (0, catchErrors_1.catchError)((req, res, next) => {
    passport_1.default.authenticate('facebook', (err, user) => {
        const userInfo = {
            id: req.session.passport.user.id,
            displayName: req.session.passport.user.displayName,
            provider: req.session.passport.user.provider,
        };
        if (err)
            return next(new appError_1.AppError('login failed ', 401));
        res.json({ message: userInfo });
    });
}));
exports.default = facebookRouter;
