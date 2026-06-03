import { useEffect } from "react";
import { useBookmarksStore } from "../stores/useBookmarksStore";

export const useStartApp = () => {
  const setBookmarks = useBookmarksStore((s) => s.setBookmarks);

  useEffect(() => {
    setBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
