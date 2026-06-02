const requiredEnvVars = [
  "PORT",
  "NODE_ENV",
  "CLIENT_URL",
  "MONGODB_URI",
] as const;

// Verify that all environmental variables exist
requiredEnvVars.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Environmental variable with key ${key} is required`);
});

export const config = {
  port: Number(process.env.PORT) || 3000,
  isProduction: process.env.NODE_ENV === "production",
  mongodbUri: process.env.MONGODB_URI!,
  clientUrl: process.env.CLIENT_URL!,
};
