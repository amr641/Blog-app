import { Request } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/appError";


export const fileUpload = (folderName:string) => {
  const storage = multer.diskStorage({
    destination: (req:Request, file, cb) => {
      cb(null, `src/uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });
  const fileFilter = (req:Request, file:any, cb:Function) => {
    const { mimetype } = file;
    if (mimetype.startsWith("image")) return cb(null, true);
    cb(new AppError(`only image allowed`, 403), false);
  };

  const upload = multer({
    fileFilter,
    storage,
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
  });
  return upload;
};
const uploadSingleFile = (folderName:string, fieldName:string) =>
  fileUpload(folderName).single(fieldName);
export { uploadSingleFile };
