import express from "express";
import { getUserInfo } from "../Controller/users.controller";
import { verifyToken } from "../Middleware/jwt.verify";

const route = express.Router();

route.get("/user", verifyToken, getUserInfo);

export default route;
