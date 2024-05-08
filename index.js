const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
router.set("json spaces", 2);
// Middleware untuk CORS
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Dummy data sebagai contoh
let products = [];


//GET to docs openapi
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'openapi.html'));
});


// GET all products
router.get('/products', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find(product => product.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST new product
router.post('/products', (req, res) => {
  const product = req.body;
  products.push(product);
  res.json({ message: 'Product added successfully' });
});

// PUT update product by ID
router.put('/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[productIndex] = req.body;
  res.json({ message: 'Product updated successfully' });
});

// DELETE product by ID
router.delete('/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});



router.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = router;
