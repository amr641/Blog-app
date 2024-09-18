import { Schema, Types, model } from "mongoose";

const replySchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  edited: {
    type: Boolean,
    default: false,
  },
  content: {
    type:String,
    required:true
  },
});
export const Reply = model("Reply", replySchema);
