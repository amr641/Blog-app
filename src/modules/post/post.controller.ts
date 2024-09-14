import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middleware/errorHandeling/catchErrors";
import { Post } from "../../../database/models/postModel";
import { AppError } from "../../utils/appError";
import { ApiFeatuers } from "../../utils/apiFeatures";

const addPost = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.body.user = req.user?.userId;
    let post = await Post.create(req.body);
    res.status(201).json({ message: "success", post });
  }
);
interface  query{
  search:string
}
const getAllPosts = catchError(
  async (req: Request<{}, {}, {}, query>, res: Response, next: NextFunction): Promise<void> => {  
    let apiFeatuers = new ApiFeatuers(Post.find({finished:true}), req.query)
    .search();

  let posts = await apiFeatuers.mongooseQuery;
    res.status(200).json({ message: "success", posts });
  }
);
const getUnFinishedPosts = catchError(async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
  let posts=await Post.find({finished:false,user:req.user?.userId})
  res.status(200).json({[`your posts`]:posts})

})
const editPost = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let post = await Post.findById(req.params.id);
    if (post?.user !== req.user?.userId)
      return next(new AppError("un authorized", 403));
    await Post.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "success", post });
  }
);
const deletePost = catchError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let post = await Post.findById(req.params.id);
    if (post?.user !== req.user?.userId)
      return next(new AppError("un authorized", 403));
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "success", post });
  }
);

export { addPost, getAllPosts, editPost, deletePost,getUnFinishedPosts };
