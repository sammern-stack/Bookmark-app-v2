import styles from "./BookmarkSidebar.module.scss";
import { useUIVisibilityStore } from "@/shared/stores";
import { AppLogo } from "@/shared/components";
import { RenderFilter, Tag, ResetTagsBtn } from "@/features/settings";
import { useBookmarks, useCountTagOccurrences } from "@/features/bookmark";
import CloseIcon from "@/assets/images/icon-close.svg?react";

export const BookmarkSidebar = () => {
  const bookmarkSidebar = useUIVisibilityStore(
    (s) => s.visibilityFlags.bookmarkSidebar,
  );

  const { data = [] } = useBookmarks();
  const tags = useCountTagOccurrences(data);

  // TODO: remove it when implement responsive design
  const isMobile = false;

  const SidebarClasses = [
    styles.bookmarkSidebar,
    bookmarkSidebar ? styles["bookmarkSidebar--open"] : "",
  ].join(" ");

  return (
    <div className={SidebarClasses}>
      <div className={styles.bookmarkSidebar__header}>
        <AppLogo />
        {isMobile && <CloseIcon />}
      </div>
      <div className={styles.bookmarkSidebar__renderOptions}>
        <RenderFilter label="home" />
        <RenderFilter label="archived" />
      </div>
      <div className={styles.bookmarkSidebar__tagsHeader}>
        <div className={styles.bookmarkSidebar__tagsTitle}>Tags</div>
        <ResetTagsBtn />
      </div>
      <div className={styles.bookmarkSidebar__tagsList}>
        {tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </div>
    </div>
  );
};
