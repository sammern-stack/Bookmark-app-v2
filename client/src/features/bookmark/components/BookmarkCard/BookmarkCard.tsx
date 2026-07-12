import styles from "./BookmarkCard.module.scss";
import { Label } from "@/shared/components";
import { BookmarkCardHeader } from "./BookmarkCardHeader";
import { BookmarkCardTags } from "./BookmarkCardTags";
import { BookmarkCardFooter } from "./BookmarkCardFooter";
import type { BookmarkSchema } from "../../types";

interface BookmarkItemProps {
  bookmark: BookmarkSchema;
}

export const BookmarkCard = ({ bookmark: b }: BookmarkItemProps) => (
  <div className={styles.bookmark}>
    <BookmarkCardHeader bookmark={b} />
    <div className={styles.bookmark__divider}></div>
    <Label className={styles.bookmark__description}>{b.description}</Label>
    <BookmarkCardTags tags={b.tags} />
    <BookmarkCardFooter bookmark={b} />
  </div>
);
