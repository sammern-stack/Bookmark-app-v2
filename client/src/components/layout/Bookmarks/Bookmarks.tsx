import { useState } from "react";
import { useBookmarksStore } from "@/stores";
import { SortByItem } from "./SortByItem";
import { RenderBookmarks } from "@/components/common";
import { Icon } from "@/components/shared";
import "./styles.scss";

export const Bookmarks = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const activeTitle = useBookmarksStore((s) => s.activeTitle);

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

  const toggleMenu = () => setOpenMenu((prev) => (prev ? false : true));

  return (
    <div className="home__bookmark-list">
      <div className="home__bookmark-header">
        <div className="home__bookmark-title">{renderTitle()}</div>

        <button className="home__bookmark-sort-by" onClick={toggleMenu}>
          <Icon name="icon-sort" />
          <span>Sort by</span>
        </button>

        {openMenu && (
          <div className="home__bookmark-sort-by-menu">
            <ul className="home__bookmark-sort-by-list">
              <SortByItem sortBy="Recently added" />
              <SortByItem sortBy="Recently visited" />
              <SortByItem sortBy="Most visited" />
            </ul>
          </div>
        )}
      </div>

      <RenderBookmarks />
    </div>
  );
};
