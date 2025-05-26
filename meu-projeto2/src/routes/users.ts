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
  const [rows] = await db.query('SELECT * FROM users');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  res.status(201).json({ message: 'Usuário criado' });
});




export default router;
