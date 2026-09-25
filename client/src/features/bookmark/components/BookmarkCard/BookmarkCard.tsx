import styles from "./BookmarkCard.module.scss";
import { Label } from "@/shared/components";
import { formatDate, formatUrl } from "@/shared/utils/formatters";
import { BookmarkMenu } from "../BookmarkMenu/BookmarkMenu";
import type { CSSProperties } from "react";
import type { BookmarkSchema } from "../../types";

import PinIcon from "@/assets/images/icon-pin.svg?react";
import VisitCountIcon from "@/assets/images/icon-visit-count.svg?react";
import LastVisitedIcon from "@/assets/images/icon-last-visited.svg?react";
import CreatedIcon from "@/assets/images/icon-created.svg?react";

interface BookmarkItemProps {
  bookmark: BookmarkSchema;
}

export const BookmarkCard = ({ bookmark: b }: BookmarkItemProps) => {
  const logoStyles: CSSProperties = {
    backgroundImage: `url(${b.favicon})`,
  };

  return (
    <div className={styles.bookmark}>
      <div className={styles.bookmark__header}>
        <div className={styles.bookmark__logo} style={logoStyles}></div>
        <div className={styles.bookmark__info}>
          <p className={styles.bookmark__title}>{b.title}</p>
          <p className={styles.bookmark__url}>{formatUrl(b.url)}</p>
        </div>
        <BookmarkMenu bookmark={b} />
      </div>
      <div className={styles.bookmark__divider}></div>
      <Label className={styles.bookmark__description}>{b.description}</Label>
      <div className={styles.bookmark__tags}>
        {b.tags.map((tag) => (
          <div className={styles.bookmark__tag} key={tag}>
            {tag}
          </div>
        ))}
      </div>
      <div className={styles.bookmark__footer}>
        <div className={styles["bookmark__footer-info"]}>
          <Label>
            <VisitCountIcon /> {b.visitCount}
          </Label>
          <Label>
            <LastVisitedIcon /> {formatDate(b.lastVisited)}
          </Label>
          <Label>
            <CreatedIcon /> {formatDate(b.createdAt)}
          </Label>
        </div>

        <div className={styles.bookmark__state}>
          {b.pinned && <PinIcon />}
          {b.isArchived && (
            <div className={styles.bookmark__archived}>Archived</div>
          )}
        </div>
      </div>
    </div>
  );
};
