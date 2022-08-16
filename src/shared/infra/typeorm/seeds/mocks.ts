/* eslint-disable no-await-in-loop */
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import createConnection from '../index';

async function createConnectionDb() {
  const connection = await createConnection('localhost');

  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO USERS(id, name, email, driver_licence, password, "isAdmin", created_at)
    values(
     '${id}',
     'Admin',
     'Admin@admin.com',
     '45651987189',
     '${password}',
     true,
     'now()')
  `);

  for (let i = 0; i <= 10; i++) {
    const usrId = uuidv4();
    const pwd = await hash('test', 8);
    await connection.query(`
    INSERT INTO USERS(id, name, email, driver_licence, password, "isAdmin", created_at)
    values(
     '${usrId}',
     'User${i}',
     'user${i}@test.com',
     '45651987189',
     '${pwd}',
     false,
     'now()')
  `);
  }

  await connection.close;
}

createConnectionDb()
  .then(() => console.log('Done!'))
  .catch(err => console.log(err));

export { createConnection };
