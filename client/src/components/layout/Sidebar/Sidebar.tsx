// ——— Imports —————————————————————————————————————————————————————————————————
import { useBookmarksStore } from "@/stores";
import { TagItem } from "@/components/common";
import { Container, List } from "@/components/shared";
import { TagsHeader, MainFilters, NavHeader } from "./";
import "./styles.scss";

// ——— Component ———————————————————————————————————————————————————————————————
export const Sidebar = () => {
  const tags = [...useBookmarksStore((s) => s.tags)];

  return (
    <Container className="home__sidebar" variant="simple">
      <NavHeader />

      <div className="home__nav-body">
        <MainFilters />

        <div className="home__tags">
          <TagsHeader />

          <List
            className="home__tags-list"
            list={tags}
            render={(t) => <TagItem key={t[0]} tag={t} />}
          />
        </div>
      </div>
    </Container>
  );
};
