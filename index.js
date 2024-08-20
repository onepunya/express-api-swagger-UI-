const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

// Middleware untuk CORS
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dummy data sebagai contoh
let products = [];

app.use(express.static(path.join(__dirname, "public")));

//GET to docs openapi
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "openapi.html"));
});

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/products/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find((product) => product.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// POST new product
app.post("/products", (req, res) => {
  const product = req.body;
  products.push(product);
  res.json({ message: "Product added successfully" });
});

// PUT update product by ID
app.put("/products/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  products[productIndex] = req.body;
  res.json({ message: "Product updated successfully" });
});

// DELETE product by ID
app.delete("/products/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.json({ message: "Product deleted successfully" });
});

// Menggunakan app.listen() untuk memulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
