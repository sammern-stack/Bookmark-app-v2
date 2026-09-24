import { create } from "zustand";
import type { BookmarkSchema } from "@/features/bookmark";

type Dialog =
  | { type: "createBookmark"; payload: null }
  | { type: "updateBookmark"; payload: BookmarkSchema }
  | null;

interface DialogStore {
  dialog: Dialog;
  openDialog: (dialog: Exclude<Dialog, null>) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: null,
  openDialog: (dialog) => set({ dialog }),
  closeDialog: () => set({ dialog: null }),
}));
