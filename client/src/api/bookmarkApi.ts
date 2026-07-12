import api from "@/shared/lib/axios";
import { apiCall } from "./apiCall";

import type {
  BookmarkModel,
  BookmarkFilters,
  RequestFn,
  IBookmark,
} from "../types";

const BASE_URL = "/api/bookmark";

export const getBookmarksRequest = (
  filter: BookmarkFilters,
): RequestFn<BookmarkModel[]> => {
  return apiCall(() => api.get(BASE_URL, { params: filter }));
};

export const getBookmarkRequest = (id: string): RequestFn<BookmarkModel> => {
  return apiCall(() => api.get(`${BASE_URL}/${id}`));
};

export const createBookmarkRequest = (
  bookmark: IBookmark,
): RequestFn<BookmarkModel> => {
  return apiCall(() => api.post(BASE_URL, bookmark));
};

export const updateIsArchivedRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.patch(`${BASE_URL}/archive/${id}`));
};

export const updatePinnedRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.patch(`${BASE_URL}/pin/${id}`));
};

export const increaseVisitCountRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.patch(`${BASE_URL}/visit-count/${id}`));
};

export const updateBookmarkRequest = (
  id: string,
  updates: IBookmark,
): RequestFn<BookmarkModel> => {
  return apiCall(() => api.put(`${BASE_URL}/${id}`, updates));
};

export const deleteBookmarkRequest = (id: string): RequestFn<void> => {
  return apiCall(() => api.delete(`${BASE_URL}/${id}`));
};
