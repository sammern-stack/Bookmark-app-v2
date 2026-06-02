import express from "express";
import cors from "cors";
import { corsOptions } from "./config/index.js";

const app = express();

// Important middleware
app.use(cors(corsOptions));
app.use(express.json());

export default app;
