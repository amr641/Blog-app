import { NextFunction, Request, Response } from "express";
import { User } from "../../../database/models/userModel";
import { AppError } from "../../utils/appError";
import { IUser } from "../../modules/user/userINTF";

const emailExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user: IUser | null = await User.findOne({ email: req.body.email });
  if (user) console.log("user exist");
  if (!user) return next();
  return next(new AppError("userAlredy exist please sign in", 409));
};
export { emailExistence };
