import { useFiltersStore } from "@/stores";
import "./styles.scss";

export const TagsHeader = () => {
  const tagFilters = useFiltersStore((s) => s.tagFilters);

  const renderReset = () => {
    if (tagFilters.length === 0) return undefined;
    return <button className="home__tags-reset">Reset</button>;
  };

  return (
    <div className="home__tags-header">
      <div className="home__tags-title">Tags</div>

      {renderReset()}
    </div>
  );
};
