import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api_db',
});

// [GET] Todos os usuários
app.get('/users', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM users');
  res.json(rows);
});

// [GET] Um usuário
app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
  if ((rows as any[]).length === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(rows[0]);
});

// [POST] Criar usuário
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  await connection.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age]);
  res.status(201).json({ message: 'User created' });
});

// [PUT] Atualizar usuário
app.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, age } = req.body;
  const [result] = await connection.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id]);
  if ((result as any).affectedRows === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User updated' });
});

// [DELETE] Deletar usuário
app.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
  if ((result as any).affectedRows === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted' });
});

// Start
app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
