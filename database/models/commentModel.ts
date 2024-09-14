import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    constent: String,
    category: String,
    tags: [String],
    comments: {
      type: Types.ObjectId,
      ref: "Comment",
    },
  });
  export const Comment= model("Post",postSchema)