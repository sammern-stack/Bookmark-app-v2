import { FilterItem, PageLogo, RenderTags } from "@/components/common";
import { Icon } from "@/components/shared";
import "./Sidebar.scss";

export const Sidebar = () => {
  const notDesktop = false;
  const isTagsActive = false;

  return (
    <div className="home__sidebar">
      <div className="home__nav">
        <div className="home__nav-header">
          <PageLogo />

          <div className="home__nav-close">
            {notDesktop && <Icon name="icon-close" />}
          </div>
        </div>

        <div className="home__nav-body">
          <div className="home__filters">
            <FilterItem label="All" icon="icon-home" />
            <FilterItem label="Archived" icon="icon-archive" />
          </div>

          <div className="home__tags">
            <div className="home__tags-header">
              <div className="home__tags-title">Tags</div>

              {isTagsActive && (
                <button className="home__tags-reset">Reset</button>
              )}
            </div>

            <RenderTags />
          </div>
        </div>
      </div>
    </div>
  );
};
