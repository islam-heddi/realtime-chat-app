import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  profileImgUrl: {
    require: false,
    default: "",
    type: String,
  },
});

export const User = model("users", UserSchema);
