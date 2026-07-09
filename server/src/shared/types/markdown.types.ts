import type { Document } from "mongoose";

export type BookmarkSchema = {
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  lastVisited: Date;
} & Document;

export type BookmarkFilters = Pick<BookmarkSchema, "tags" | "isArchived">;
export type BookmarkFilterQuery = Partial<BookmarkFilters>;

export type BookmarkCreateBody = Pick<
  BookmarkSchema,
  "title" | "url" | "description" | "tags"
>;
export type BookmarkUpdateBody = Partial<BookmarkCreateBody>;
