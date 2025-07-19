import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  emiterId: String,
  receiverId: String,
  createdAt: Date,
  content: String,
  isSeened: {
    type: Boolean,
    default: false,
  },
});

export const Chat = model("chat", ChatSchema);
