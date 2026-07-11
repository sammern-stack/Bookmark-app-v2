import styles from "./BookmarkCard.module.scss";
import { BookmarkMenu } from "../BookmarkMenu/BookmarkMenu";
import { Label } from "@/shared/components";
import { formatUrl } from "@/shared/utils/formatters";
import type { BookmarkModel } from "@/types";

interface BookmarkCardHeaderProps {
  bookmark: BookmarkModel;
}

export const BookmarkCardHeader = ({
  bookmark: b,
}: BookmarkCardHeaderProps) => {
  const bookmarkLogoStyle = {
    backgroundImage: `url(${b.favicon})`,
  };

  return (
    <div className={styles.bookmark__header}>
      <div className={styles.bookmark__logo} style={bookmarkLogoStyle}></div>
      <div className={styles.bookmark__info}>
        <Label className={styles.bookmark__title}>{b.title}</Label>
        <Label className={styles.bookmark__url}>{formatUrl(b.url)}</Label>
      </div>
      <BookmarkMenu bookmark={b} />
    </div>
  );
};
