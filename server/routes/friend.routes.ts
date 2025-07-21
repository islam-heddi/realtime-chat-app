import { Router } from "express";
import {
  sendFriendRequest,
  getFriendsRequests,
  applyRequest,
} from "../Controller/friends.controller";
import { verifyToken } from "../Middleware/jwt.verify";

const route = Router();

route.get("/", verifyToken, getFriendsRequests);
route.post("/send", verifyToken, sendFriendRequest);
route.patch("/apply", verifyToken, applyRequest);

export default route;
