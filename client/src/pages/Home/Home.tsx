import { useStartApp } from "../../hooks/useStartApp";
import { useBookmarksStore } from "../../stores/useBookmarksStore";

import home from "../../assets/images/icon-home.svg";
import archived from "../../assets/images/icon-archive.svg";
import close from "../../assets/images/icon-close.svg";
import avatar from "../../assets/images/image-avatar.webp";
import sort from "../../assets/images/icon-sort.svg";
import menuBookmark from "../../assets/images/icon-menu-bookmark.svg";
import pinned from "../../assets/images/icon-pin.svg";
import views from "../../assets/images/icon-visit-count.svg";
import lastVisited from "../../assets/images/icon-last-visited.svg";
import createdAt from "../../assets/images/icon-created.svg";

import { CiBookmark } from "react-icons/ci";
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
              {notDesktop && (
                <img src={close} alt="cross icon, close sidebar" />
              )}
            </div>
          </div>

          <div className="home__nav-body">
            <div className="home__filters">
              <div className="home__filter">
                <img src={home} alt="home icon, get all bookmarks" />
                <span>All</span>
              </div>

              <div className="home__filter">
                <img
                  src={archived}
                  alt="archived icon, get archived bookmarks"
                />
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
              <img src={sort} alt="sort bookmarks by" />
              <span>Sort by</span>
            </div>
          </div>

          <div className="home__bookmark-grid">
            {bookmarks.map((b) => (
              <div className="home__bookmark bookmark">
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
                        <img src={menuBookmark} alt="" />
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
                      <img src={views} alt="visit count icon" />
                      {b.visitCount}
                    </div>

                    <div className="bookmark__last-visited">
                      <img src={lastVisited} alt="last visited icon" />
                      {new Date(b.lastVisited).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>

                    <div className="bookmark__created">
                      <img src={createdAt} alt="created icon" />
                      {new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="bookmark__state">
                    {isPinned && (
                      <img className="bookmark__pinned" src={pinned} alt="" />
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
