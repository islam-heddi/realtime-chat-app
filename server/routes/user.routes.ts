import express from "express";
import { getUserInfo, searchUsers } from "../Controller/users.controller";
import { verifyToken } from "../Middleware/jwt.verify";

const route = express.Router();

route.get("/user", verifyToken, getUserInfo);
route.post("/user/search", searchUsers);

export default route;
