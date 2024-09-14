import { NextFunction, Response, Request } from "express";
import path from "path";
import fs from "fs";
import { AppError } from "./appError";

const removeOldImage:any = function (image: string|undefined):void {
 let filePath = path.resolve() +"/src/uploads/user/"+image;
 console.log(filePath);
    fs.unlinkSync(filePath);
};
export { removeOldImage };
