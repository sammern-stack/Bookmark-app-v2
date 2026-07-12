import { create } from "zustand";

type Flags = "createForm" | "updateForm" | "bookmarkSidebar";

type UIVisibilityState = {
  visibilityFlags: Record<Flags, boolean>;
  toggle: (flag: Flags) => void;
};

export const useUIVisibilityStore = create<UIVisibilityState>((set) => ({
  visibilityFlags: {
    createForm: false,
    updateForm: false,
    bookmarkSidebar: false,
  },

  toggle: (flag: Flags) =>
    set((s) => ({
      visibilityFlags: {
        ...s.visibilityFlags,
        [flag]: !s.visibilityFlags[flag],
      },
    })),
}));
