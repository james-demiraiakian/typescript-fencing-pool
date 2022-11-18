import { Router } from 'express';
import User from '../models/User.js';
import { UserService } from '../services/UserService.js';

const ONE_DAY_IN_MS: number = 1000 * 60 * 60 * 24;

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

      const cookieName = process.env.COOKIE_NAME;
      if (cookieName === undefined) {
        return Error('Cookie must be named');
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
  });

export default userController;
