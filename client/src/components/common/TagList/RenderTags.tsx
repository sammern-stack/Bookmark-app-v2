import { useBookmarksStore } from "@/stores";
import { TagItem } from "./TagItem";
import "./styles.scss";

export const RenderTags = () => {
  const tags = useBookmarksStore((s) => s.tags);
  return (
    <div className="home__tags-list">
      {[...tags].map(([key, value]) => (
        <TagItem key={key} tag={[key, value]} />
      ))}
    </div>
  );
};
