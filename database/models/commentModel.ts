import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  edited: {
    type: Boolean,
    default: false,
  },
  post:{type:Types.ObjectId,ref:"Post"},
  content: String,
  replies: [
    {
      type: Types.ObjectId,
      ref: "Reply",
    },
  ],
});
export const Comment = model("Comment", commentSchema);
