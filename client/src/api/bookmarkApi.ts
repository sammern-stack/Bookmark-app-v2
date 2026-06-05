import api from "./axios";
import { apiCall } from "./apiCall";

import type {
  BookmarkModel,
  BookmarkFilters,
  RequestFn,
  IBookmark,
} from "../types";

type GetBookmarks = (filter: BookmarkFilters) => RequestFn<BookmarkModel[]>;
type CreateBookmark = (bookmark: IBookmark) => RequestFn<BookmarkModel>;

export const getBookmarksRequest: GetBookmarks = async (filter) =>
  apiCall(() => api.get("/", { params: filter }));

export const createBookmarkRequest: CreateBookmark = (bookmark) =>
  apiCall(() => api.post("/", bookmark));
