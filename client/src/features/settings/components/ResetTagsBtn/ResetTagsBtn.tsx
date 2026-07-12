import styles from "./ResetTagsBtn.module.scss";
import { useFiltersStore } from "@/features/settings/stores/filterStore";

export const ResetTagsBtn = () => {
  const tagFilters = useFiltersStore((s) => s.tagFilters);
  const clearTagsFilters = useFiltersStore((s) => s.clearTagsFilters);

  if (tagFilters.length === 0) return null;

  return (
    <button className={styles.resetTagsBtn} onClick={() => clearTagsFilters()}>
      Reset
    </button>
  );
};
