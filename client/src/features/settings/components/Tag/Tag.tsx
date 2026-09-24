import styles from "./Tag.module.scss";
import { useFiltersStore } from "@/features/settings/stores/filterStore";

interface TagFilterProps {
  tag: [string, number];
}

export const Tag = ({ tag: [value, count] }: TagFilterProps) => {
  const tagFilters = useFiltersStore((s) => s.tagFilters);
  const { addTagFilter, removeTagFilter } = useFiltersStore.getState();

  return (
    <div className={styles.tag}>
      <div className={styles.tag__header}>
        <input
          type="checkbox"
          id={`select-tag--${value}`}
          checked={tagFilters.includes(value)}
          onChange={(e) =>
            e.target.checked ? addTagFilter(value) : removeTagFilter(value)
          }
        />

        <label className={styles.tag__title} htmlFor={`select-tag--${value}`}>
          {value}
        </label>
      </div>

      <div className={styles.tag__total}>{count}</div>
    </div>
  );
};
