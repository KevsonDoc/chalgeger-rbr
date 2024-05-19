import winston from 'winston';

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      params => `${params.timestamp} | ${params.level}: ${params.message}`,
    ),
  ),
  defaultMeta: { service: 'api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          params => `${params.timestamp} | ${params.level}: ${params.message}`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});
