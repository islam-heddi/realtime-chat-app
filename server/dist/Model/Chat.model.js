"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    emiterId: String,
    receiverId: String,
    createdAt: new Date(),
    content: String,
});
exports.Chat = (0, mongoose_1.model)("chat", ChatSchema);
