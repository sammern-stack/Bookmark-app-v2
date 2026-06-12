import { useBookmarksStore } from "@/stores";
import { RenderBookmarks } from "@/components/common";
import { Icon } from "@/components/shared";
import "./styles.scss";

export const Bookmarks = () => {
  const activeTitle = useBookmarksStore((s) => s.activeTitle);

  return (
    <div className="home__bookmark-list">
      <div className="home__bookmark-header">
        <div className="home__bookmark-title">{activeTitle}</div>

        <button className="home__bookmark-sort-by">
          <Icon name="icon-sort" />
          <span>Sort by</span>
        </button>
      </div>

      <RenderBookmarks />
    </div>
  );
};
