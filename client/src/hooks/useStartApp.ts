import { useEffect } from "react";
import { useBookmarksStore, useThemeStore } from "../stores";

export const useStartApp = () => {
  const setBookmarks = useBookmarksStore((s) => s.setBookmarks);
  const setTags = useBookmarksStore((s) => s.setTags);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setBookmarks();
    setTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
