import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.route.js";
import { corsOptions } from "./config/corsOptions.js";
import { errorHandler } from "@/shared/middleware/errorHandler.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;
