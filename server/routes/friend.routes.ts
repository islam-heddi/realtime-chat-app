import { Router } from "express";
import {
  sendFriendRequest,
  getFriendsRequests,
  applyRequest,
  getFriends,
} from "../Controller/friends.controller";
import { verifyToken } from "../Middleware/jwt.verify";

const route = Router();

route.get("/", verifyToken, getFriendsRequests);
route.get("/myFriends", verifyToken, getFriends);
route.post("/send", verifyToken, sendFriendRequest);
route.patch("/apply", verifyToken, applyRequest);

export default route;
