import styles from "./BookmarkCard.module.scss";
import type { BookmarkSchema } from "../../types";
import { formatDate } from "@/shared/utils/formatters";
import { Label } from "@/shared/components";
import PinIcon from "@/assets/images/icon-pin.svg?react";

import VisitCountIcon from "@/assets/images/icon-visit-count.svg?react";
import LastVisitedIcon from "@/assets/images/icon-last-visited.svg?react";
import CreatedIcon from "@/assets/images/icon-created.svg?react";

interface BookmarkCardFooterProps {
  bookmark: BookmarkSchema;
}

export const BookmarkCardFooter = ({
  bookmark: b,
}: BookmarkCardFooterProps) => {
  return (
    <div className={styles.bookmark__footer}>
      <div className={styles["bookmark__footer-info"]}>
        <Label icon={<VisitCountIcon />}>{b.visitCount}</Label>
        <Label icon={<LastVisitedIcon />}>{formatDate(b.lastVisited)}</Label>
        <Label icon={<CreatedIcon />}>{formatDate(b.createdAt)}</Label>
      </div>

      <div className={styles.bookmark__state}>
        {b.pinned && <PinIcon />}
        {b.isArchived && (
          <div className={styles.bookmark__archived}>Archived</div>
        )}
      </div>
    </div>
  );
};
