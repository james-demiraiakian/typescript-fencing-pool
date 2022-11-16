import { Router } from 'express';
import User from '../models/User.js';
import { UserService } from '../services/UserService.js';

const ONE_DAY_IN_MS: number = 1000 * 60 * 60 * 24;
const cookieName = process.env.COOKIE_NAME;

const userController = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({
        email,
        password,
      });

      if (cookieName === undefined) {
        return new Error('Cookie must be named');
      }
      res
        .cookie(cookieName, sessionToken, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .send({ message: 'Signed In', user: sessionToken });
    } catch (error) {
      next(error);
    }
  })
  .delete('/sessions', async (req, res) => {
    if (cookieName === undefined) {
      return new Error('Cookie must be named');
    }
    res
      .clearCookie(cookieName)
      .json({ success: true, message: 'Signed Out' });
  });

export default userController;
