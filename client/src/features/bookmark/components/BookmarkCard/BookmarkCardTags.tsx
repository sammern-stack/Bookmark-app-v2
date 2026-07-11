import styles from "./BookmarkCard.module.scss";

interface BookmarkCardTagsProps {
  tags: string[];
}

export const BookmarkCardTags = ({ tags }: BookmarkCardTagsProps) => {
  return (
    <div className={styles.bookmark__tags}>
      {tags.map((t) => (
        <div className={styles.bookmark__tag} key={t}>
          {t}
        </div>
      ))}
    </div>
  );
};
