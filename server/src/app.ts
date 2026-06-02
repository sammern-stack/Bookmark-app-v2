import express from "express";
import cors from "cors";

const app = express();

// Important middleware
app.use(cors());
app.use(express.json());

export default app;
