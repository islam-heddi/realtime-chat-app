import express from "express";
import auth from "./routes/auth.routes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import setupSocket from "./socket";
import user from "./routes/user.routes";
import chat from "./routes/chat.routes";
dotenv.config();
const app = express();
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log("mongodb failed to connect Error: " + err));
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);
app.use("/", user);
app.use("/chat", chat);
const server = app.listen(PORT, () => {
  console.log(`the server is listening ${PORT}`);
});

setupSocket(server);

module.exports = app;
