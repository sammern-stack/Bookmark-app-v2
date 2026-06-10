import { FilterItem } from "@/components/common";
import "./styles.scss";

export const MainFilters = () => {
  return (
    <div className="home__filters">
      <FilterItem label="Home" icon="icon-home" filter="home" />
      <FilterItem label="Archived" icon="icon-archive" filter="archived" />
    </div>
  );
};
