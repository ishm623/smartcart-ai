const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SmartCart AI API Running" });
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "AirPods Pro",
      currentPrice: 350,
      predictedPrice: 315
    }
  ]);
});

const PORT = 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;