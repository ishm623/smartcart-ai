const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const products = [
  {
    id: 1,
    name: "AirPods Pro",
    category: "Electronics",
    currentPrice: 350,
    predictedPrice: 315
  },
  {
    id: 2,
    name: "PlayStation 5",
    category: "Gaming",
    currentPrice: 799,
    predictedPrice: 749
  },
  {
    id: 3,
    name: "iPhone 15",
    category: "Mobile",
    currentPrice: 1499,
    predictedPrice: 1399
  },
  {
    id: 4,
    name: "MacBook Air M3",
    category: "Laptop",
    currentPrice: 1899,
    predictedPrice: 1799
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "SmartCart AI API Running"
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

const app = require("./app");

if (require.main === module) {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

module.exports = app;