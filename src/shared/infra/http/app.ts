/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import { rateLimiter } from './middlewares/rateLimiter';
import { routes } from './routes';
import '../../container';

createConnection();
const app = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(rateLimiter);
app.use('/', routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `internal server error - ${error.message}`,
  });
});

export { app };
