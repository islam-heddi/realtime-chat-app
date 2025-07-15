"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log("mongodb failed to connect Error: " + err));
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_routes_1.default);
app.use((0, cors_1.default)());
const server = app.listen(PORT, () => {
    console.log(`the server is listening ${PORT}`);
});
