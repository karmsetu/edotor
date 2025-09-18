// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test";
    PORT?: string;
    CORS_ORIGIN?: string;
    MONGO_URI?: string;
    ACCESS_TOKEN_SECRET?: string;
    ACCESS_EXPIRY?: `${number}d`;
    REFRESH_TOKEN_SECRET?: string;
    REFRESH_EXPIRY?: `${number}d`;
    DATABASE_URL?: string;
    AUTH_SECRET?: string;
    AUTH_GITHUB_ID?: string;
    AUTH_GITHUB_SECRET?: string;
    AUTH_GOOGLE_ID?: string;
    AUTH_GOOGLE_SECRET?: string;
    AI_URL?: string;
    AI_MODEL?: string;
    // Add your other variables here
  }
}
