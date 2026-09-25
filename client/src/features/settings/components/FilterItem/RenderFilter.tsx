import styles from "./RenderFilter.module.scss";
import { useFiltersStore, type MainFilter } from "@/features/settings";
import type { PropsWithChildren } from "react";

interface RenderFilterProps extends PropsWithChildren {
  label: MainFilter;
}

export const RenderFilter = ({ label, children }: RenderFilterProps) => {
  const setMainFilter = useFiltersStore((s) => s.setMainFilter);
  const mainFilter = useFiltersStore((s) => s.mainFilter);

  const handleOnClick = () => setMainFilter(label);

  const renderClasses = [
    styles.renderFilter,
    mainFilter === label && styles["renderFilter--active"],
  ].join(" ");

  return (
    <div className={renderClasses} onClick={handleOnClick}>
      {children}
    </div>
  );
};
