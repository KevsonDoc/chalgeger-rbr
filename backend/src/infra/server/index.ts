import 'express-async-errors';
import { config } from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { database } from '../database';
import { logger } from '../logger';
import { route } from '../../core/employees';
import { HttpExeption } from '../error/HttpExeption';

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
  }

  public static loadEnvs(): void {
    config({ path: `.env.${process.env.NODE_ENV ?? 'production'}` });
  }

  public async start(): Promise<void> {
    const port = Number(process.env.APP_PORT);

    if (!port) {
      throw new Error('port is not defined as envirioment');
    }

    this.app.use(express.json());
    this.app.use('/api', route);
    this.app.use(
      (error: unknown, _: Request, response: Response, next: NextFunction) => {
        if (error instanceof HttpExeption) {
          return response.status(error.httpStatusCode).json({
            message: error.messages,
          });
        }

        if (error instanceof Error) {
          logger.error(error);
          return response.status(500).json({
            message: 'Erro no servidor',
          });
        }

        return next();
      },
    );

    await database.connect(String(process.env.MONGO_URL));
    this.app.listen(Number(process.env.APP_PORT), () => {
      logger.info('Server is running');
      logger.info(`Server port: ${port}`);
    });
  }
}
