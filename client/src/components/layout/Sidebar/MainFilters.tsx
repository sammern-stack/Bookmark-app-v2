// ——— Imports —————————————————————————————————————————————————————————————————
import { FilterItem } from "@/components/common";
import "./styles.scss";

// ——— Component ———————————————————————————————————————————————————————————————
export const MainFilters = () => {
  return (
    <div className="home__filters">
      <FilterItem label="All" icon="icon-home" filter="all" />
      <FilterItem label="Archived" icon="icon-archive" filter="archived" />
    </div>
  );
};
