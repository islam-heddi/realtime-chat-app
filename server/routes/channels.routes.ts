import { Router } from "express";
import {
  createChannel,
  getChannelMessages,
  getChannels,
  getMyChannels,
  joinChannel,
} from "../Controller/channel.controller";
import { verifyToken } from "../Middleware/jwt.verify";
const route = Router();

route.post("/create", verifyToken, createChannel);
route.get("/get", getChannels);
route.get("/getMyChannels", verifyToken, getMyChannels);
route.get("/getMessages/:id", getChannelMessages);
route.post("/join", joinChannel);

export default route;
