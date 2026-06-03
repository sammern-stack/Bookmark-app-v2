import { Router } from "express";

import {
  getBookmarks,
  createBookmark,
} from "../controllers/bookmark.controller.js";

const router = Router();

router.route("/").get(getBookmarks).post(createBookmark);

export default router;
