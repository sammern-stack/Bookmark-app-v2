import { create } from "zustand";
import type { BookmarkModel } from "@/types";

type TFormState = "open" | "close";

interface FormStore {
  createFormState: TFormState;
  setCreateFormState: (state: TFormState) => void;

  updateFormState: TFormState;
  setUpdateFormState: (state: TFormState) => void;

  selectedBookmark: BookmarkModel | null;
  setSelectedBookmark: (b: BookmarkModel) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  createFormState: "close",
  setCreateFormState: (state) => set({ createFormState: state }),

  updateFormState: "close",
  setUpdateFormState: (state) => set({ updateFormState: state }),

  selectedBookmark: null,
  setSelectedBookmark: (b) => set({ selectedBookmark: b }),
}));
