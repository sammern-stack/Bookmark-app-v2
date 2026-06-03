import { useStartApp } from "../../hooks/useStartApp";
import { useBookmarksStore } from "../../stores/useBookmarksStore";

import { Icon } from "../../components/shared";
import { CiBookmark } from "react-icons/ci";
import avatar from "../../assets/images/image-avatar.webp";
import "./Home.scss";

const Home = () => {
  useStartApp();

  // Temp
  const notDesktop = false;
  const isPinned = false;
  const isArchived = false;

  const bookmarks = useBookmarksStore((s) => s.bookmarks);
  const tags = useBookmarksStore((s) => s.tags);

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
              <div className="home__filter">
                <Icon name="icon-home" />
                <span>All</span>
              </div>

              <div className="home__filter">
                <Icon name="icon-archive" />
                <span>Archived</span>
              </div>
            </div>

            <div className="home__tags">
              <div className="home__tags-subheader"></div>

              {[...tags].map(([key, value]) => (
                <div className="home__tag" key={key}>
                  <label className="home__tag-title">
                    <input type="checkbox" id="select-tag" />
                    {key}
                  </label>

                  <div className="home__tag-total">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="home__main-content">
        <div className="home__header">
          <div className="home__search-bar">Search...</div>

          <div className="home__profile-create-section">
            <div className="home__create-btn">+ Add Bookmark</div>

            <div className="home__profile-icon">
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

            <div className="home__bookmark-sort-by">
              <Icon name="icon-sort" />
              <span>Sort by</span>
            </div>
          </div>

          <div className="home__bookmark-grid">
            {bookmarks.map((b) => (
              <div className="home__bookmark bookmark" key={b._id}>
                <div className="bookmark__content">
                  <div className="bookmark__header">
                    <img
                      src={b.favicon}
                      alt="bookmark icon"
                      className="bookmark__logo"
                    />

                    <div className="bookmark__info">
                      <div className="bookmark__title">{b.title}</div>

                      <div className="bookmark__url">url here</div>

                      <div className="bookmark__menu">
                        <Icon name="icon-menu-bookmark" />
                      </div>
                    </div>
                  </div>

                  <div className="bookmark__divider">---</div>

                  <div className="bookmark__description">{b.description}</div>

                  <div className="bookmark__tags">{b.tags.join(", ")}</div>
                </div>

                <div className="bookmark__footer">
                  <div className="bookmark__footer-info">
                    <div className="bookmark__visit-count">
                      <Icon name="icon-visit-count" />
                      {b.visitCount}
                    </div>

                    <div className="bookmark__last-visited">
                      <Icon name="icon-last-visited" />
                      {new Date(b.lastVisited).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>

                    <div className="bookmark__created">
                      <Icon name="icon-created" />
                      {new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="bookmark__state">
                    {isPinned && (
                      <Icon className="bookmark__pinned" name="icon-pin" />
                    )}

                    {isArchived && (
                      <div className="bookmark__archived">archived</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home__toast"></div>
    </div>
  );
};

export default Home;
