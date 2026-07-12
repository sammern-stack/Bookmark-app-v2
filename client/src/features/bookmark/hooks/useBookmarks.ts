import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkApi } from "../services/bookmarkApi";
import type { BookmarkFilters, BookmarkCreateBody } from "../types";

export const useBookmarks = (filters?: BookmarkFilters) => {
  return useQuery({
    queryKey: ["bookmarks", filters],
    queryFn: () => bookmarkApi.getAll(filters),
  });
};

export const useBookmark = (bookmarkId: string) => {
  return useQuery({
    queryKey: ["bookmark", bookmarkId],
    queryFn: () => bookmarkApi.getById(bookmarkId),
  });
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmark: BookmarkCreateBody) => bookmarkApi.create(bookmark),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
};

export const useUpdateBookmark = (bookmarkId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<BookmarkCreateBody>) =>
      bookmarkApi.update(bookmarkId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", bookmarkId] });
    },
  });
};

export const useDeleteBookmark = (bookmarkId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkApi.delete(bookmarkId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
};

export const useUpdateIsArchived = (bookmarkId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkApi.updateIsArchived(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", bookmarkId] });
    },
  });
};

export const useUpdatePinned = (bookmarkId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkApi.updatePinned(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", bookmarkId] });
    },
  });
};

export const useIncreaseVisitCount = (bookmarkId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkApi.increaseVisitCount(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", bookmarkId] });
    },
  });
};
