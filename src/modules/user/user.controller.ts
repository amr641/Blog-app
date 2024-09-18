import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../../../database/models/userModel";
import { catchError } from "../../middleware/errorHandeling/catchErrors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError";
import { IUser } from "./userINTF";
import { removeOldImage } from "../../utils/removeOldImage";
import { Post } from "../../../database/models/postModel";
const signUp = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.avatar = req.file?.filename;
    let user = await User.create(req.body);
    let token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_KEY as string
    );
    return res.status(201).json({ message: "success", token });
  }
);
const login = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser | null = await User.findOne({ email: req.body.email });

    if (!user || !bcrypt.compare(req.body.password, user.password))
      return next(new AppError("incorrect email or password", 403));
    let token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_KEY as string
    );
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
    return res
      .status(201)
      .json({ message: `welcome back ${user.name}`, token, posts });
  }
);
// only the user can update his profile
const updateUserProfile = catchError(
  async (req: Request | any, res: Response, next: NextFunction) => {
    let user: IUser | null = await User.findByIdAndUpdate(
      req.user.userId,
      req.body
    );
    if (!user) return next(new AppError("user not found please register", 404));
    if (req.file) {
      req.body.avatar = req.file.filename;

      removeOldImage(user?.avatar);
    }
    res.status(201).json({ message: "success" });
  }
);
// delete user profile
const deleteUserProfile = catchError(
  async (req: Request | any, res: Response, next: NextFunction) => {
    let user: IUser | null = await User.findByIdAndDelete(req.user.userId);
    user || next(new AppError("user not found", 404));
    !user || res.status(200).json({ message: "deleted successfully" });
  }
);
export { signUp, login, updateUserProfile, deleteUserProfile };
