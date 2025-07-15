import express from "express";

const route = express.Router();

route.get("/login", (req, res) => {
  res.status(200).send("login page");
});

export default route;
