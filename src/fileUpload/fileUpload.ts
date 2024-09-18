import { Request, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/appError";
import multer, { FileFilterCallback } from 'multer';


export const fileUpload = (folderName:string) => {
  const storage = multer.diskStorage({
    destination: (req:Request, file, cb) => {
      cb(null, `src/uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
      
    },
  });
//   const storageVideo = multer.diskStorage({
//     destination: function(req:Request, file, cb){
//         cb(null, `src/uploads/${folderName}`)
//     },
//     filename:function(req, file, cb){
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

  const fileFilter = (req:Request, file: Express.Multer.File, cb:Function) => {
    const { mimetype } = file;
    if (mimetype.startsWith("image")||mimetype=='video/mp4') return cb(null, true);
    cb(new Error('Invalid file type. Only video files are allowed!'), false);
  };


  const upload = multer({
    fileFilter,
    storage,
    limits: {
      // maximum file size 10mb
      fileSize: 10 * 1024 * 1024,
    },
  });
//   const uploadVideo = multer({
//     storage: storageVideo,
//     limits: {fileSize:10 * 1024 * 1024},
//     fileFilter: fileFilterVideo
// });
  return upload
};
const uploadSingleFile = (folderName:string, fieldName:string) =>
  fileUpload(folderName).single(fieldName);
  // const uploadVideo=(folderName:string, fieldName:string) =>
  // fileUpload(folderName).upload.single(fieldName);
export { uploadSingleFile };
