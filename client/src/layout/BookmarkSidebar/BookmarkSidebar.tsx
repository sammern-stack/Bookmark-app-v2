import styles from "./BookmarkSidebar.module.scss";
import { useMemo } from "react";
import { useUIVisibilityStore } from "@/shared/stores";
import { AppLogo, Container, List } from "@/shared/components";
import { RenderFilter, TagFilter, ResetTagsBtn } from "@/features/settings";
import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import { countOccurrences } from "@/shared/utils/collections";
import CloseIcon from "@/assets/images/icon-close.svg";

export const BookmarkSidebar = () => {
  const bookmarkSidebar = useUIVisibilityStore(
    (s) => s.visibilityFlags.bookmarkSidebar,
  );

  const { data = [] } = useBookmarks();

  const tags = useMemo(() => {
    const getTags = data.flatMap((bookmark) => bookmark.tags);
    return countOccurrences(getTags);
  }, [data]);

  // TODO: remove it when implement responsive design
  const isMobile = false;

  const SidebarClasses = [
    styles.bookmarkSidebar,
    bookmarkSidebar ? styles["bookmarkSidebar--open"] : "",
  ].join(" ");

  return (
    <Container variant="stacked" className={SidebarClasses}>
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
      <List list={tags} className={styles.bookmarkSidebar__tagsList}>
        {(tag) => <TagFilter tag={tag} />}
      </List>
    </Container>
  );
};
