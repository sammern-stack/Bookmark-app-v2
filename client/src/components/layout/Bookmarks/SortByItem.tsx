import { Icon } from "@/components/shared";
import { useFiltersStore, type SortBy } from "@/stores/useFiltersStore";

interface SortByItemProps {
  sortBy: SortBy;
}

export const SortByItem = ({ sortBy }: SortByItemProps) => {
  const sortByFilter = useFiltersStore((s) => s.sortByFilter);
  const setSortByFilter = useFiltersStore((s) => s.setSortByFilter);

  return (
    <li
      className="home__bookmark-sort-by-item"
      onClick={() => setSortByFilter(sortBy)}
    >
      <span>{sortBy}</span>
      {sortByFilter === sortBy && (
        <Icon name="icon-sort-by-check" width="16" height="16" />
      )}
    </li>
  );
};
