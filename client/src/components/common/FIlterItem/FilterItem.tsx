import { Container, Icon } from "@/components/shared"
import './FilterItem.scss'

interface FilterItemProps {
  label: string;
  icon: string;
}

export const FilterItem = ({ label, icon }: FilterItemProps) => {
  return (
    <Container variant="simple" className="home__filter">
      <Icon name={icon} />
      <span>{label}</span>
    </Container>
  );
};
