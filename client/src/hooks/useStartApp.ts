import { useEffect } from "react";
import { useBookmarksStore } from "../stores";

export const useStartApp = () => {
  const setBookmarks = useBookmarksStore((s) => s.setBookmarks);
  const setTags = useBookmarksStore((s) => s.setTags);

  useEffect(() => {
    setBookmarks();
    setTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
