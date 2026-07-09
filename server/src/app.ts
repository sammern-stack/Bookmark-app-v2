import express from "express";
import cors from "cors";
import bookmarkRoutes from "./routes/bookmark.route.js";
import { corsOptions } from "./config/corsOptions.js";
import { errorHandler } from "@/shared/middleware/errorHandler.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bookmarks", bookmarkRoutes);

app.use(errorHandler);

export default app;
