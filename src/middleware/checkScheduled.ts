import { NextFunction,Response,Request } from "express";
import { catchError } from "./errorHandeling/catchErrors";
import { Post } from "../../database/models/postModel";
import { IPost } from "../modules/post/postINTF";

export const checkScheduledPosts =catchError(async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    let posts:IPost[] =await Post.find({scheduled:true})
    posts.map(async ele=>{
        // set automatically the finished property based on the publish date
        ele.finished=ele.publishDate<=new Date()
        await ele.save()
    })
   
    next()
})