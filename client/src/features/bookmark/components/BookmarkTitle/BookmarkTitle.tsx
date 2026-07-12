import styles from "./BookmarkTitle.module.scss";
import { useBookmarksStore } from "@/features/bookmark/stores/bookmarkStore";

export const BookmarkTitle = () => {
  const activeTitle = useBookmarksStore((s) => s.activeTitle);
  const isTagView = activeTitle.includes("Bookmarks tagged");
  const [tagLabel, tagValue] = activeTitle.split(":");

  return (
    <div className={styles.bookmarkTitle}>
      {isTagView ? (
        <>
          <span>{tagLabel} :</span>
          <span>{tagValue}</span>
        </>
      ) : (
        activeTitle
      )}
    </div>
  );
};
