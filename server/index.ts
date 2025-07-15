import express from "express";
import auth from "./routes/auth.routes";
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/auth", auth);

const server = app.listen(PORT, () => {
  console.log(`the server is listening ${PORT}`);
});
