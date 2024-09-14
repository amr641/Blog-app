import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  edited: {
    type: Boolean,
    default: false,
  },
  content: String,
  replies: [
    {
      type: Types.ObjectId,
      ref: "Reply",
    },
  ],
});
export const Comment = model("Post", postSchema);
