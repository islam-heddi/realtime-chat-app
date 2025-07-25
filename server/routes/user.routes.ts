import express from "express";
import { getUserInfo, searchUsers } from "../Controller/users.controller";
import { verifyToken } from "../Middleware/jwt.verify";
import { updateProfile } from "../Controller/profile.controller";

const route = express.Router();

route.get("/user", verifyToken, getUserInfo);
route.post("/user/search", searchUsers);
route.post("/user/profile", verifyToken, updateProfile);

export default route;
