import { Router } from "express";
import * as bookmarkController from "./bookmark.controller.js";

const router = Router();

router
  .route("/")
  .get(bookmarkController.getBookmarks)
  .post(bookmarkController.createBookmark);

router
  .route("/:id")
  .get(bookmarkController.getBookmark)
  .delete(bookmarkController.deleteBookmark)
  .put(bookmarkController.updateBookmark);

router.patch("/archive/:id", bookmarkController.updateIsArchived);
router.patch("/pin/:id", bookmarkController.updatePinned);
router.patch("/visit-count/:id", bookmarkController.increaseVisitCount);

export default router;
