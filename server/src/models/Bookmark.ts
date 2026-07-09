import { Schema, model } from "mongoose";
import type { BookmarkSchema } from "@/shared/types/markdown.types.js"

const bookmarkSchema = new Schema<BookmarkSchema>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title cant be less that 3 characters"],
    },

    url: {
      type: String,
      required: [true, "Url is required"],
      unique: true,
    },

    favicon: {
      type: String,
      default: "/favicon-32x32.png",
    },

    description: {
      type: String,
      maxLength: [300, "Description can't be more than 300 characters"],
    },

    tags: {
      type: [String],
      default: [],
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    visitCount: {
      type: Number,
      default: 0,
    },

    lastVisited: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Bookmark = model("bookmark", bookmarkSchema);
export default Bookmark;
