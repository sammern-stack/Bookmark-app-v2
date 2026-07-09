import { Router } from "express";
import bookmarkRouter from "@/features/bookmark/bookmark.route.js";

const router = Router();

router.use("/bookmark", bookmarkRouter);

export default router;
