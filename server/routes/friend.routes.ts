import { Router } from "express";
import {
  sendFriendRequest,
  applyFriendRequest,
  getFriendsRequests,
} from "../Controller/friends.controller";
import { verifyToken } from "../Middleware/jwt.verify";

const route = Router();

route.get("/", verifyToken, getFriendsRequests);
route.post("/send", verifyToken, sendFriendRequest);
route.post("/apply", verifyToken, applyFriendRequest);

export default route;
