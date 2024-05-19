import { config } from 'dotenv';
import express, { Express } from 'express';
import { database } from '../database';
import { logger } from '../logger';

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

    await database.connect(String(process.env.MONGO_URL));

    this.app.listen(Number(process.env.APP_PORT), () => {
      logger.info('Server is running');
      logger.info(`Server port: ${port}`);
    });
  }
}
