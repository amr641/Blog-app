import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { User } from "../../database/models/userModel";

declare global {
  // extending the Request type globaly
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        email: string;
      };
    }
  }
}
export const verfifyToken = (req:Request, res:Response, next:NextFunction)=> {
  const token:any|string= req.headers?.token
  jwt.verify(token, "amoor", async(err:any, decoded:any) => {
    if (err) return next(new AppError("inavlid token", 401));
    let user= await User.findById(decoded.userId);
    if(!user) return next(new AppError("user not found",404))
    
    req.user = decoded;
 
    next();
  });
};  
