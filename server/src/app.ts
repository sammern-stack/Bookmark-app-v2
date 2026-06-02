import express from "express";
import cors from "cors";
import bookmarkRoutes from "./routes/bookmark.route.js";
import { corsOptions } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Important middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/bookmarks", bookmarkRoutes);

// Error Handler Middleware
app.use(errorHandler);

export default app;
