import { useBookmarksStore } from "@/stores";
import { SortByItem } from "./SortByItem";
import { BookmarkItem } from "@/components/common";
import { Dropdown, Icon, List } from "@/components/shared";
import "./styles.scss";

export const Bookmarks = () => {
  const activeTitle = useBookmarksStore((s) => s.activeTitle);
  const bookmarks = useBookmarksStore((s) => s.bookmarks);

  const renderTitle = () => {
    if (activeTitle.includes("Bookmarks tagged")) {
      return (
        <>
          <span>{activeTitle.split(":")[0]} :</span>
          <span>{activeTitle.split(":")[1]}</span>
        </>
      );
    } else {
      return activeTitle;
    }
  };

  return (
    <div className="home__bookmark-list">
      <div className="home__bookmark-header">
        <div className="home__bookmark-title">{renderTitle()}</div>

        <Dropdown
          className="home__sort-by"
          toggleEl={
            <button className="home__sort-by">
              <Icon name="icon-sort" />
              <span>Sort by</span>
            </button>
          }
          menuEl={
            <ul className="home__sort-by-list">
              <SortByItem sortBy="Recently added" />
              <SortByItem sortBy="Recently visited" />
              <SortByItem sortBy="Most visited" />
            </ul>
          }
        />
      </div>

      <List
        className="home__bookmark-grid"
        list={bookmarks}
        render={(b) => <BookmarkItem bookmark={b} />}
      />
    </div>
  );
};
