import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true, min: 1, max: 50 },
  content: {
    type: String,
    required:true
  },
  category: String,
  tags: [String],
  finished: {
    type: Boolean,
    default: true,
  },
  scheduled: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
});
postSchema.post("find", function (doc) {
  let url = process.env.BASE_URL + "/posts/";
  doc.content = url + doc.content;
});
export const Post = model("Post", postSchema);
