import { RenderTags } from "@/components/common";
import { Container } from "@/components/shared";
import { TagsHeader, MainFilters, NavHeader } from "./";
import "./styles.scss";

export const Sidebar = () => (
  <Container className="home__sidebar" variant="simple">
    <NavHeader />

    <div className="home__nav-body">
      <MainFilters />

      <div className="home__tags">
        <TagsHeader />

        <RenderTags />
      </div>
    </div>
  </Container>
);
