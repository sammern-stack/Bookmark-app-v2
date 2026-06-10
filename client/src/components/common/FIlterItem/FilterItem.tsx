import { useFiltersStore } from "@/stores";
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

  return (
    <Container
      variant="clickable"
      className="home__filter"
      extraClassNames={mainFilter === filter ? "home__filter--active" : ""}
      onClick={() => setMainFilter(filter)}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </Container>
  );
};
