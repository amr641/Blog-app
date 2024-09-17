import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  title:String,
  content: String,
  category: String,
  tags: [String],
  finished: {
    type: Boolean,
    default: true,
  },
  scheduled:{
    type:Boolean,
    default:false
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
});
postSchema.post("init", function (doc) {
  let url = process.env.BASE_URL+"/posts";
  doc.content = url + doc.content;
});
export const Post = model("Post", postSchema);
