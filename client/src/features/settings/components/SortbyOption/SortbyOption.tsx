import styles from "./SortbyOption.module.scss";
import SortbyCheckIcon from "@/assets/images/icon-sort-by-check.svg";
import {
  useFiltersStore,
  type SortBy,
} from "@/features/settings/stores/filterStore";

interface SortbyOptionProps {
  sortBy: SortBy;
}

export const SortbyOption = ({ sortBy }: SortbyOptionProps) => {
  const sortByFilter = useFiltersStore((s) => s.sortByFilter);
  const setSortByFilter = useFiltersStore((s) => s.setSortByFilter);

  console.log("sortByFilter", sortByFilter);

  return (
    <li className={styles.sortByOption} onClick={() => setSortByFilter(sortBy)}>
      <span>{sortBy}</span>
      {sortByFilter === sortBy && <SortbyCheckIcon />}
    </li>
  );
};
