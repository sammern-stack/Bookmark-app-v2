import { useFiltersStore, useBookmarksStore } from "@/stores";
import { Container, Icon } from "@/components/shared";
import "./FilterItem.scss";

interface FilterItemProps {
  label: string;
  icon: string;
  filter: "home" | "archived";
}

export const FilterItem = ({ label, icon, filter }: FilterItemProps) => {
  const setMainFilter = useFiltersStore((s) => s.setMainFilter);
  const mainFilter = useFiltersStore((s) => s.mainFilter);
  const setActiveTitle = useBookmarksStore((s) => s.setActiveTitle);

  const handleOnClick = () => {
    setMainFilter(filter);
    setActiveTitle(filter === "home" ? "All bookmarks" : "Archived bookmarks");
  };

  return (
    <Container
      variant="clickable"
      className="home__filter"
      extraClassNames={mainFilter === filter ? "home__filter--active" : ""}
      onClick={handleOnClick}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </Container>
  );
};
