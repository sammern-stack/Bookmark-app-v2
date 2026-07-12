import styles from "./RenderFilter.module.scss";
import { useBookmarksStore } from "@/features/bookmark/stores/bookmarkStore";
import { useFiltersStore } from "@/features/settings/stores/filterStore";
import { Container } from "@/shared/components";
import { capitalize } from "@/shared/utils/formatters";
import HomeIcon from "@/assets/images/icon-home.svg";
import ArchivedIcon from "@/assets/images/icon-archive.svg";

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

  return (
    <Container
      variant="stacked"
      className={`${styles.renderFilter} ${mainFilter === label ? styles["renderFilter--active"] : ""}`}
      onClick={handleOnClick}
    >
      {label === "home" ? <HomeIcon /> : <ArchivedIcon />}
      <span>{capitalize(label)}</span>
    </Container>
  );
};
