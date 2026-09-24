import styles from "./RenderFilter.module.scss";
import { useBookmarksStore } from "@/features/bookmark";
import { useFiltersStore } from "@/features/settings/stores/filterStore";
import { capitalize } from "@/shared/utils/formatters";
import HomeIcon from "@/assets/images/icon-home.svg?react";
import ArchivedIcon from "@/assets/images/icon-archive.svg?react";

interface RenderFilterProps {
  label: "home" | "archived";
}

export const RenderFilter = ({ label }: RenderFilterProps) => {
  const setMainFilter = useFiltersStore((s) => s.setMainFilter);
  const mainFilter = useFiltersStore((s) => s.mainFilter);
  const setActiveTitle = useBookmarksStore((s) => s.setActiveTitle);

  const handleOnClick = () => {
    setMainFilter(label);
    setActiveTitle(label === "home" ? "All bookmarks" : "Archived bookmarks");
  };

  const renderClasses = [
    styles.renderFilter,
    mainFilter === label ? styles["renderFilter--active"] : "",
  ].join(" ");

  return (
    <div className={renderClasses} onClick={handleOnClick}>
      {label === "home" ? <HomeIcon /> : <ArchivedIcon />}
      <span>{capitalize(label)}</span>
    </div>
  );
};
