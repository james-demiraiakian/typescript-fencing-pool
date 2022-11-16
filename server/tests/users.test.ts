import request from 'supertest';
import app from '../app';
import {
  afterAll,
  describe,
  expect,
  it,
  beforeEach,
} from '@jest/globals';
import User from '../models/User';
import setupDb from '../setup-data.js';

describe('server', () => {
  beforeEach(() => {
    return setupDb();
  });

  afterAll((done) => {
    app.close(done);
  });

  const user = {
    clubId: '206',
    email: 'f.f@stone.com',
    name: 'Fred Flonstine',
    owner: true,
    passwordHash: 'y4bb4d4bb4d00',
  };

  const userCredentials = {
    email: 'f.f@stone.com',
    password: 'y4bb4d4bb4d00',
  };

  it('Inserts a user into the database', async () => {
    const res = await request(app).post('/users').send(user);

    expect(res.status).toBe(200);
  });

  it('Logs a user in', async () => {
    await request(app).post('/users').send(user);

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

  it('Logs a user out', async () => {
    const register = await request(app).post('/users').send(user);
    const signin = await request(app)
      .post('/users/sessions')
      .send({ email: user.email, password: user.passwordHash });

    const res = await request(app).delete('/users/sessions');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed Out',
    });

    User.testDelete(userCredentials.email);
  });
});
