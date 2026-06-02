import { config } from "./index.js";
import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: config.clientUrl,
};
