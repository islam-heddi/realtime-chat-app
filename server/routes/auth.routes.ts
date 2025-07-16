import express from "express";
import { signIn, signUp } from "../Controller/auth.controller";
import { checkDateValidation } from "../Middleware/check.data.register";
const route = express.Router();

route.post("/login", signIn);
route.post("/register", checkDateValidation, signUp);

export default route;
