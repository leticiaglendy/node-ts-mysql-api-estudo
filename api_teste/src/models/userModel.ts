import { connection } from '../database/connection';

export async function getAllUsers() {
  const [rows] = await connection.query('SELECT * FROM users');
  return rows;
}

export async function getUserById(id: number) {
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows;
}

export async function createUser(name: string, email: string, age: number) {
  const [result] = await connection.query(
    'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
    [name, email, age]
  );
  return result;
}

export async function updateUser(id: number, name: string, email: string, age: number) {
  const [result] = await connection.query(
    'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    [name, email, age, id]
  );
  return result;
}

export async function deleteUser(id: number) {
  const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
}
