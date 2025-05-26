import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste_db',
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, price } = req.body;
  await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
  res.status(201).json({ message: 'Produto criado' });
});

export default router;
