import styles from "./BookmarkSidebar.module.scss";
import { RenderFilter, Tag, useFiltersStore } from "@/features/settings";
import { useBookmarks, useCountTagOccurrences } from "@/features/bookmark";
import { useThemeStore } from "@/shared/stores";

import LightThemeLogo from "@/assets/images/logo-dark-theme.svg?react";
import DarkThemeLogo from "@/assets/images/logo-light-theme.svg?react";
import HomeIcon from "@/assets/images/icon-home.svg?react";
import ArchivedIcon from "@/assets/images/icon-archive.svg?react";

export const BookmarkSidebar = () => {
  const theme = useThemeStore((s) => s.theme);
  const tagFilters = useFiltersStore((s) => s.tagFilters);
  const { clearTagsFilters } = useFiltersStore.getState();
  const handleClear = () => clearTagsFilters();

  const { data = [] } = useBookmarks();
  const tags = useCountTagOccurrences(data);

  return (
    <>
      <div className={styles.bookmarkSidebar__logo}>
        {theme === "dark" ? <LightThemeLogo /> : <DarkThemeLogo />}
      </div>
      <div className={styles.bookmarkSidebar__renderOptions}>
        <RenderFilter label="home">
          <HomeIcon /> Home
        </RenderFilter>
        <RenderFilter label="archived">
          <ArchivedIcon /> Archived
        </RenderFilter>
      </div>
      <div className={styles.bookmarkSidebar__tagsHeader}>
        <div className={styles.bookmarkSidebar__tagsTitle}>Tags</div>
        {tagFilters.length !== 0 && (
          <button type="button" onClick={handleClear}>
            Reset
          </button>
        )}
      </div>
      <div className={styles.bookmarkSidebar__tagsList}>
        {tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </div>
    </>
  );
};
