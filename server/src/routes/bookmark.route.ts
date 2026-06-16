import { Router } from "express";

import {
  getBookmarks,
  createBookmark,
  updateIsArchived,
  deleteBookmark
} from "../controllers/bookmark.controller.js";

const router = Router();

router.route("/").get(getBookmarks).post(createBookmark);
router.route("/:id").delete(deleteBookmark);

router.patch("/archive/:id", updateIsArchived);

export default router;
