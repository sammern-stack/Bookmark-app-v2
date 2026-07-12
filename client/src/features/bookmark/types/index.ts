export interface BookmarkSchema {
  _id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  lastVisited: string;
  createdAt: string;
  updatedAt: string;
}

export type BookmarkFilters = Partial<
  Pick<BookmarkSchema, "tags" | "isArchived">
>;

export type BookmarkFormValues = Pick<
  BookmarkSchema,
  "title" | "url" | "description"
> & { tags: string };

export type BookmarkCreateBody = Pick<
  BookmarkSchema,
  "title" | "url" | "description" | "tags"
>;

export type BookmarkUpdateBody = Partial<
  Pick<BookmarkSchema, "title" | "url" | "description" | "tags">
>;
