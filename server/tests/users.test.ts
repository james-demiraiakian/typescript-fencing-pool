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

describe('server', () => {
  afterAll((done) => {
    app.close(done);
  });

  it('Gets users from Database', async () => {
    const expected = {};
    const res = await request(app).get('/users');

    expect(res.body).toEqual(expected);
  });
});
