declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production";
    CLIENT_URL: string;
    MONGODB_URI: string;
  }
}
