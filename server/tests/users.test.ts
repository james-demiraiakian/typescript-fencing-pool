import db from '../database';
import request from 'supertest';
import app from '../app';
import {
  afterAll,
  afterEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { userInterface } from '../types/interface.js';

describe('server', () => {
  afterAll((done) => {
    app.close(done);
  });

  it('Inserts a user into the database', async () => {
    const user = {
      clubId: '206',
      email: 'f.f@stone.com',
      name: 'Fred Flonstine',
      owner: true,
      passwordHash: 'y4bb4d4bb4d00',
    };

    const res = await request(app).post('/users').send(user);

    expect(res.status).toBe(200);
  });

  it('logs a user into the Database', async () => {
    const userCredentials = {
      email: 'f.f@stone.com',
      password: 'y4bb4d4bb4d00',
    };
    const expected = {
      message: 'Signed In',
      user: expect.any(String),
    };
    const res = await request(app)
      .post('/users/sessions')
      .send(userCredentials);
    const actual = res.body;

    expect(actual).toEqual(expected);
  });
});
