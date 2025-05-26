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
  const [rows] = await db.query('SELECT * FROM orders');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  await db.query(
    'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
    [userId, productId, quantity]
  );
  res.status(201).json({ message: 'Pedido criado' });
});

export default router;
