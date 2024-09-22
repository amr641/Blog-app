import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    max: 30,
    min: 3,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: String,
  bio: String,
  preferences: String,
  passwordChangedTime: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String,
  },
  accountId: {
    type: String,
  },
});
userSchema.post("find", function (doc) {
  let url = process.env.BASE_URL + "/user";
  doc.avatar = url + doc.avatar;
});

export const User = model("User", userSchema);
