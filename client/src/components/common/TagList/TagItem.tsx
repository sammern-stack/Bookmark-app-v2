import { Container } from "@/components/shared";
import "./styles.scss";
import { useFiltersStore } from "@/stores";

interface TagItemProps {
  tag: [string, number];
}

export const TagItem = ({ tag }: TagItemProps) => {
  const tagFilters = useFiltersStore((s) => s.tagFilters);
  const addTagFilter = useFiltersStore((s) => s.addTagFilter);
  const removeTagFilter = useFiltersStore((s) => s.removeTagFilter);

  const tagValue = tag[0];
  const tagCount = tag[1];

  const handleApplyTagFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) addTagFilter(tagValue);
    else removeTagFilter(tagValue);
  };

  return (
    <Container className="home__tag" variant="simple">
      <div className="home__tag-header">
        <input
          type="checkbox"
          id={`select-tag--${tagValue}`}
          checked={tagFilters.includes(tagValue)}
          onChange={(e) => handleApplyTagFilter(e)}
        />

        <label className="home__tag-title" htmlFor={`select-tag--${tagValue}`}>
          {tagValue}
        </label>
      </div>

      <div className="home__tag-total">{tagCount}</div>
    </Container>
  );
};
