const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Sữa tươi Vinamilk', desc: 'Hộp 1L' },
  { id: 2, name: 'Trứng gà sạch', desc: 'Hộp 10 quả' }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = { ...req.body, id: Date.now() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(3001, () => {
  console.log('🚀 API server running at http://localhost:3001');
});
