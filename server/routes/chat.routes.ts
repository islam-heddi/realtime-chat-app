import express from "express";
import { verifyToken } from "../Middleware/jwt.verify";
import { getMessages } from "../Controller/chat.controller";
const route = express.Router();

route.get("/messages/:receiverId", verifyToken, getMessages);

export default route;
