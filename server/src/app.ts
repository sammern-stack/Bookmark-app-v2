import express from "express";
import cors from "cors";
import { corsOptions } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Important middleware
app.use(cors(corsOptions));
app.use(express.json());

// Roues goes here

app.use(errorHandler);

export default app;
