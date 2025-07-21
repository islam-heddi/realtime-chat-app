import { Router } from "express";
import { createChannel, getChannels } from "../Controller/channel.controller";
import { verifyToken } from "../Middleware/jwt.verify";
const route = Router();

route.post("/create", verifyToken, createChannel);
route.get("/get", getChannels);

export default route;
