import { useFiltersStore } from "@/stores";
import { Container, Icon } from "@/components/shared";
import "./FilterItem.scss";

interface FilterItemProps {
  label: string;
  icon: string;
  filter: "all" | "archived";
}

export const FilterItem = ({ label, icon, filter }: FilterItemProps) => {
  const setMainFilter = useFiltersStore((s) => s.setMainFilter);

  return (
    <Container
      variant="clickable"
      className="home__filter"
      onClick={() => setMainFilter(filter)}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </Container>
  );
};
