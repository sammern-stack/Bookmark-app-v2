import "dotenv/config";
import app from "./app.js";
import { config, connectDB } from "./config/index.js";

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server is listening on port: ${config.port}`);
  });
};

start();
