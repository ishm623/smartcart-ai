const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "SmartCart AI API Running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get("/products", (req, res) => {
  res.json([]);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



module.exports = app;