import styles from "./TagFilter.module.scss";
import { Container } from "@/shared/components";
import { useFiltersStore } from "@/features/settings/stores/filterStore";

interface TagFilterProps {
  tag: [string, number];
}

export const TagFilter = ({ tag }: TagFilterProps) => {
  const tagFilters = useFiltersStore((s) => s.tagFilters);
  const addTagFilter = useFiltersStore((s) => s.addTagFilter);
  const removeTagFilter = useFiltersStore((s) => s.removeTagFilter);

  const tagValue = tag[0];
  const tagCount = tag[1];

  const handleApplyTagFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) addTagFilter(tagValue);
    else removeTagFilter(tagValue);
  };

  return (
    <Container className={styles.tag} variant="stacked">
      <div className={styles.tag__header}>
        <input
          type="checkbox"
          id={`select-tag--${tagValue}`}
          checked={tagFilters.includes(tagValue)}
          onChange={(e) => handleApplyTagFilter(e)}
        />

        <label
          className={styles.tag__title}
          htmlFor={`select-tag--${tagValue}`}
        >
          {tagValue}
        </label>
      </div>

      <div className={styles.tag__total}>{tagCount}</div>
    </Container>
  );
};
