import express from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';
import swaggerFile from './swagger.json';
import 'express-async-errors';
import './database';
import './shared/container';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', routes);

app.listen(3333, () => console.log('Server is running'));
