import { useStartApp } from "@/hooks";
import { useBookmarksStore, useThemeStore } from "@/stores";

import { RenderBookmarks, RenderTags, FilterItem } from "@/components/common";
import { Icon } from "@/components/shared";
import { CiBookmark } from "react-icons/ci";
import avatar from "@/assets/images/image-avatar.webp";
import "./Home.scss";

const Home = () => {
  useStartApp();

  // Temp
  const notDesktop = false;
  const isTagsActive = false;

  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className="home">
      <div className="home__sidebar">
        <div className="home__nav">
          <div className="home__nav-header">
            <div className="home__logo">
              <div className="home__logo-icon">
                <CiBookmark />
              </div>

              <div className="home__logo-title">Bookmark Manager</div>
            </div>

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

      <div className="home__main-content">
        <div className="home__header">
          <div className="home__header-left">
            {notDesktop && <div className="home__hamburger-menu"></div>}

            <div className="home__search-bar">Search...</div>
          </div>

          <div className="home__header-right">
            <div className="home__create-btn">+ Add Bookmark</div>

            <div className="home__profile-icon" onClick={() => toggleTheme()}>
              <img
                src={avatar}
                alt="user's profile icon"
                width="40"
                height="40"
              />
            </div>
          </div>
        </div>

        <div className="home__bookmark-list">
          <div className="home__bookmark-header">
            <div className="home__bookmark-title">All Bookmarks</div>

            <button className="home__bookmark-sort-by">
              <Icon name="icon-sort" />
              <span>Sort by</span>
            </button>
          </div>

          <RenderBookmarks />
        </div>
      </div>

      <div className="home__toast"></div>
    </div>
  );
};

export default Home;
