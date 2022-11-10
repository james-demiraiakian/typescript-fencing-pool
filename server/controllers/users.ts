import { Router } from 'express';
import User from '../models/User.js';

const userController = Router().get('/', async (req, res) => {
  const users = await User.getAll();
  res.send(users);
});

export default userController;
