import { Router } from "express";
import {
  createChannel,
  getChannelMessages,
  getChannels,
  getMyChannels,
} from "../Controller/channel.controller";
import { verifyToken } from "../Middleware/jwt.verify";
const route = Router();

route.post("/create", verifyToken, createChannel);
route.get("/get", getChannels);
route.get("/getMyChannels", verifyToken, getMyChannels);
route.get("/getMessages/:id", getChannelMessages);

export default route;
