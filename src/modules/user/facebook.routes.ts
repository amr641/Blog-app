import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { catchError } from "../../middleware/errorHandeling/catchErrors";
import { NextFunction, Response, Request, Router } from "express";
import session from "express-session";
import { User } from "../../../database/models/userModel";
import jwt from "jsonwebtoken";
import { IUser } from "./userINTF";
import { AppError } from "../../utils/appError";
import { Post } from "../../../database/models/postModel";

// Initialize Facebook Router
export const facebookRouter = Router();

// Session Setup
facebookRouter.use(
  session({
    secret: process.env.SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
facebookRouter.use(passport.initialize());
facebookRouter.use(passport.session());

// Serialize user into session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});
// postman-to-openapi 'D:\projects\Blog-app\blog.postman_collection.json' -o 'path/to/swagger-doc.yaml' --yaml

// Configure Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || "347803424993032", // Use environment variables for security
      clientSecret:
        process.env.FACEBOOK_APP_SECRET || "afa180595ae501d79d699eb39c1f6ef9", // Avoid hard-coding secrets
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"], // Fetch required fields
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({
          accountId: profile.id,
          provider: "facebook",
        });

        // If user doesn't exist, create new user
        if (!user) {
          user = new User({
            accountId: profile.id,
            name: profile.displayName,
            provider: "facebook",
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Route to start Facebook login with scope
facebookRouter.get("/auth/facebook", passport.authenticate("facebook"));

// Callback route once Facebook authentication is done
facebookRouter.get(
  "/auth/facebook/callback",
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("facebook", async (err: Error, user: any) => {
      if (err) {
        return next(new AppError("Facebook Authentication Failed", 500)); // Handle error properly
      }
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" }); // Handle case when authentication fails
      }

      // Fetch user from DB
      let acc:any = await User.findOne({ accountId: user.accountId });

      if (!acc) {
        return next(new AppError("user not found", 404));
      }

      // Generate JWT token
      const token = jwt.sign(
        { name: acc.name, userId: acc._id },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" } // Token expiry for security
      );
      acc.status= true
      await acc.save()
      // posts
      let posts = await Post.find({ finished: true })
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
  })
);
