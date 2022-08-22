import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('List all categories', () => {
  beforeAll(async () => {
    connection = await createConnection();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, driver_licence, password, "isAdmin", created_at)
    values(
     '${id}',
     'Admin Supertest2',
     'adminsupertest2@admin.com',
     '45651987189',
     '${password}',
     true,
     'now()')
  `);
  });

  it('Should be able to list all categories', async () => {
    const authToken = await request(app).post('/sessions').send({
      email: 'adminsupertest@admin.com',
      password: 'admin',
    });

    const { token } = authToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest 8',
        description: 'Category supertest description 8',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });
});
