const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "SmartCart AI API Running" });
});

app.get("/products", (req, res) => {
  res.json([]);
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

module.exports = app;