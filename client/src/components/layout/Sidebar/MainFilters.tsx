import { FilterItem } from "@/components/common";
import "./styles.scss";

export const MainFilters = () => {
  return (
    <div className="home__filters">
      <FilterItem label="All" icon="icon-home" />
      <FilterItem label="Archived" icon="icon-archive" />
    </div>
  );
};
