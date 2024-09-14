import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/appError";

const validate = (schema:any) => {
  return (req:Request, res:Response, next:NextFunction) => {
    let files = () => {return {[`${req.file?.fieldname}`]: req.file };}
      
    
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
        ...files(),
      },
      { abortEarly: false }
    );
    if (!error) return next();
    const errors = error?.details.map((ele:Error)=> ele.message);
    next(new AppError(errors, 403));
  };
};
export default validate;
