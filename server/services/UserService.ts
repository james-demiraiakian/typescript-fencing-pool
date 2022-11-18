import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  signInInterface,
  userInterface,
} from '../../common/interface';

export class UserService {
  static async create({
    id,
    name,
    email,
    passwordHash,
    clubId,
    owner,
  }: userInterface) {
    passwordHash = await bcrypt.hash(
      passwordHash,
      Number(process.env.SALT_ROUNDS)
    );

    const user: User = await User.insert({
      email,
      passwordHash,
      id,
      name,
      clubId,
      owner,
    });

    return user;
  }

  static async signIn({ email, password }: signInInterface) {
    try {
      const user: userInterface = await User.getByEmail(email);

      if (!user) throw new Error('Invalid SignIn Credentials');

      if (!bcrypt.compareSync(password, user.passwordHash)) {
        throw new Error('Invalid SignIn Credentials');
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) throw new Error('no secret');

      const token = jwt.sign({ ...user }, jwtSecret, {
        expiresIn: '1 day',
      });

      return token;
    } catch (error: any) {
      error.status = 401;
      throw error;
    }
  }
}
