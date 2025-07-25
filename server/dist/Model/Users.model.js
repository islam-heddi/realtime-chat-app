"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    profileImgUrl: {
        require: false,
        default: "",
        type: String,
    },
});
exports.User = (0, mongoose_1.model)("users", UserSchema);
