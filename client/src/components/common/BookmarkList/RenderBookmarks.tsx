import { useBookmarksStore } from "@/stores";
import { BookmarkItem } from "./BookmarkItem";
import "./styles.scss";

export const RenderBookmarks = () => {
  const bookmarks = useBookmarksStore((s) => s.bookmarks);

  return (
    <div className="home__bookmark-grid">
      {bookmarks.map((b) => (
        <BookmarkItem bookmark={b} key={b._id} />
      ))}
    </div>
  );
};
