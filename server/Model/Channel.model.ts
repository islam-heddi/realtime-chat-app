import { Schema, model } from "mongoose";

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  creatorId: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
});

export const Channel = model("Channel", channelSchema);
