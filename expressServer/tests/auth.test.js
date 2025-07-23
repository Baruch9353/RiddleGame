const request = require('supertest');
const app = require('../expressServer/app');

describe('Auth API', () => {
  test('signup + login success', async () => {
    const user = { username: 'testuser', password: '123456' };
    await request(app).post('/api/auth/signup').send(user).expect(200);
    const res = await request(app).post('/api/auth/login').send(user).expect(200);
    expect(res.body.token).toBeDefined();
  });

  test('login with wrong password', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpass' })
      .expect(403);
  });
});
