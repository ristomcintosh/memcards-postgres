declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_DATABASE_NAME: string;
    UNSPLASH_API_ID: string;
  }
}
