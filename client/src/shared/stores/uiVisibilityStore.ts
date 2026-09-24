import { create } from "zustand";

type Flags = "bookmarkSidebar";

type UIVisibilityState = {
  visibilityFlags: Record<Flags, boolean>;
  toggle: (flag: Flags) => void;
};

export const useUIVisibilityStore = create<UIVisibilityState>((set) => ({
  visibilityFlags: {
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
