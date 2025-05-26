import { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../models/userModel';

export async function listUsers(req: Request, res: Response) {
  const users = await getAllUsers();
  res.json(users);
}

export async function getUser(req: Request, res: Response) { 
  const id = Number(req.params.id);
  const user = await getUserById(id);

  if (Array.isArray(user) && user.length > 0) {
    res.json(user[0]); // Retorna o usuário encontrado
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

export async function addUser(req: Request, res: Response) {
  const { name, email, age } = req.body;
  await createUser(name, email, age);
  res.status(201).json({ message: 'User created successfully' });
}

export async function editUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email, age } = req.body;
  await updateUser(id, name, email, age);
  res.json({ message: 'User updated successfully' });
}

export async function removeUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  await deleteUser(id);
  res.json({ message: 'User deleted successfully' });
}
