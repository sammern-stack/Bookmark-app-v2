import { Router } from "express";

import {
  getBookmarks,
  createBookmark,
  updateIsArchived,
  updatePinned,
  updateBookmark,
  deleteBookmark,
} from "../controllers/bookmark.controller.js";

const router = Router();

router.route("/").get(getBookmarks).post(createBookmark);
router.route("/:id").delete(deleteBookmark).put(updateBookmark);

router.patch("/archive/:id", updateIsArchived);
router.patch("/pin/:id", updatePinned);

export default router;
