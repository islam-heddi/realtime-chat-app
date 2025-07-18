"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signUp = exports.signIn = void 0;
const bcrypt_1 = require("bcrypt");
const Users_model_1 = require("../Model/Users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield Users_model_1.User.findOne({
            email,
        });
        if (!result)
            return res.status(400).send("email not found");
        const check = yield (0, bcrypt_1.compare)(password, result.password);
        if (!check)
            return res.status(400).send("password does not match");
        const token = jsonwebtoken_1.default.sign({ userId: result._id }, process.env.SECRET_KEY, {
            expiresIn: 15 * 24 * 60 * 60 * 100,
        });
        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 100,
            secure: true,
        });
        return res.status(201).send(result);
    }
    catch (error) {
        return res.status(500).send(`error: ${error}`);
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = yield Users_model_1.User.insertOne({
            email,
            password: hashedPassword,
            name,
        });
        return res.status(200).send(newUser);
    }
    catch (error) {
        return res.status(500).send(`error: ${error}`);
    }
});
exports.signUp = signUp;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user;
    if (!id)
        return res.status(400).send("token not found please try to relogin");
    try {
        res.clearCookie("token");
        return res.status(200).send(`sign out successfully`);
    }
    catch (error) {
        return res.status(500).send(`error: ${error}`);
    }
});
exports.signOut = signOut;
