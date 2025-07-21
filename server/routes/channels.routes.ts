import { Router } from "express";
import {
  createChannel,
  getChannels,
  getMyChannels,
} from "../Controller/channel.controller";
import { verifyToken } from "../Middleware/jwt.verify";
const route = Router();

route.post("/create", verifyToken, createChannel);
route.get("/get", getChannels);
route.get("/getMyChannels", verifyToken, getMyChannels);

export default route;
