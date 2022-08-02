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
     'Nicole Admin',
     'nicole@admin.com',
     '45651987189',
     '${password}',
     true,
     'now()')
  `);

  await connection.close;
}

createConnectionDb()
  .then(() => console.log('User admin created'))
  .catch(err => console.log(err));

export { createConnection };
