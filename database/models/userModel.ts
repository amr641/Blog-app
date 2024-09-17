import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  bio: String,
  prefernces: String,
  passwordChangedTime: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
userSchema.post("find", function (doc) {
  let url = process.env.BASE_URL+"/user";
  doc.avatar = url + doc.avatar;
});

export const User = model("User", userSchema);
