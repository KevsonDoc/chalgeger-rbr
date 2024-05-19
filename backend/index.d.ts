declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';
    APP_PORT: string;
    MONGO_URL: string;
  }
}
