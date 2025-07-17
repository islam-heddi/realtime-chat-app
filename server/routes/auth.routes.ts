import express from "express";
import { signIn, signUp, signOut } from "../Controller/auth.controller";
import { checkDateValidation } from "../Middleware/check.data.register";
import { verifyToken } from "../Middleware/jwt.verify";
const route = express.Router();

route.post("/login", signIn);
route.post("/register", checkDateValidation, signUp);
route.get("/deconnect", verifyToken, signOut);

export default route;
