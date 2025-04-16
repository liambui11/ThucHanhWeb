const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Luan14102019',
  database: 'food_beverage_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

// GET: lấy danh sách sản phẩm từ database
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi khi truy vấn dữ liệu:', err);
      return res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
    }
    res.json(results);
  });
});

// POST: thêm sản phẩm vào database
app.post('/api/products', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Thiếu name hoặc description' });
  }

  const query = 'INSERT INTO products (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi thêm sản phẩm:', err);
      return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
    }

    res.status(201).json({
      id: result.insertId,
      name,
      description
    });
  });
});

app.listen(3001, () => {
  console.log('🚀 API server running at http://localhost:3001');
});
