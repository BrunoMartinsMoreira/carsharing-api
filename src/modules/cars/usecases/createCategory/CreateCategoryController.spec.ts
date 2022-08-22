import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, driver_licence, password, "isAdmin", created_at)
    values(
     '${id}',
     'Admin Supertest',
     'adminsupertest@admin.com',
     '45651987189',
     '${password}',
     true,
     'now()')
  `);
  });

  it('Should be able to create a new category', async () => {
    const authToken = await request(app).post('/sessions').send({
      email: 'adminsupertest@admin.com',
      password: 'admin',
    });

    const { token } = authToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category if category name exists', async () => {
    const authToken = await request(app).post('/sessions').send({
      email: 'adminsupertest@admin.com',
      password: 'admin',
    });

    const { token } = authToken.body;

    const res = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(400);
  });
});
