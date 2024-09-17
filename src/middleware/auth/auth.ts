import { NextFunction, Request, Response } from "express";
import { User } from "../../../database/models/userModel";
import bcrypt from'bcrypt'
import { AppError } from "../../utils/appError";
import { IUser } from "../../modules/user/userINTF";
import jwt from "jsonwebtoken"
import { catchError } from "../errorHandeling/catchErrors";

const changeUserPassword = async (req:Request, res:Response, next:NextFunction) => {
    const user:null|IUser = await User.findById(req.user?.userId);
    // compare old password with the provided one.
    if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password))
      return next(new AppError('your oldPassword is incorrect', 401));
    // hash the new password
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    // add the changed date
    let token = jwt.sign(
      { userId: user._id,name:user.name,email:user.email },
      "amoor"
    );
    // update and insert it into dataBase
    await User.updateOne(
      { _id: req.user?.userId },
      {
        password: req.body.newPassword,
        passwordChangedTime: Date.now(),
      }
    );
  
    res.status(201).json({ message: 'password changed successfully',token });
  };
  const protectRoutes = catchError(async (req:Request, res:Response, next:NextFunction)  => {
  
    let user:null|IUser  =await  User.findById(req.user?.userId)
    if(!user) return next(new AppError("user not found",404))
    // seconds==>millie seconds ==> Date
    const secondsToDate = (seconds:any|number) => new Date(seconds * 1000);
  
    if(secondsToDate(req.user?.iat)<user?.passwordChangedTime)return next(new AppError('expired token..login again',409))
    next()
  
  });
  export {changeUserPassword,protectRoutes}