import express from 'express';
import {
  listUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/users', listUsers);          // Read all
router.get('/users/:id', getUser);        // Read one
router.post('/users', addUser);           // Create
router.put('/users/:id', editUser);       // Update
router.delete('/users/:id', removeUser);  // Delete

export default router;
