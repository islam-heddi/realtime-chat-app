"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../Controller/auth.controller");
const check_data_register_1 = require("../Middleware/check.data.register");
const jwt_verify_1 = require("../Middleware/jwt.verify");
const route = express_1.default.Router();
route.post("/login", auth_controller_1.signIn);
route.post("/register", check_data_register_1.checkDateValidation, auth_controller_1.signUp);
route.get("/deconnect", jwt_verify_1.verifyToken, auth_controller_1.signOut);
exports.default = route;
