import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  emiterId: String,
  receiverId: String,
  createdAt: new Date(),
  content: String,
});

export const Chat = model("chat", ChatSchema);
