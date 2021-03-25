const express = require("express");
const Friends = require("./friends/friends-model");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/friends", (req, res) => {
  Friends.getAll()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/friends/:id", (req, res) => {
  res.end()
});

server.post("/friends", async (req, res) => {
  res.json(await Friends.insert(req.body))
});

server.delete("/friends/:id", (req, res) => {
  res.end()
});



module.exports = server;
