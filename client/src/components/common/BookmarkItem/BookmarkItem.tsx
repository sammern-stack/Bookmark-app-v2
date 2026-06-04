import type { BookmarkModel } from "@/types";
import { Icon } from "@/components/shared";
import "./BookmarkItem.scss";

interface BookmarkItemProps {
  bookmark: BookmarkModel;
}

export const BookmarkItem = ({ bookmark: b }: BookmarkItemProps) => {
  const isPinned = false;
  const isArchived = false;

  return (
    <div className="bookmark">
      <div className="bookmark__content">
        <div className="bookmark__header">
          <img src={b.favicon} alt="bookmark icon" className="bookmark__logo" />

          <div className="bookmark__info">
            <div className="bookmark__title">{b.title}</div>

            <div className="bookmark__url">url here</div>
          </div>

          <div className="bookmark__menu">
            <Icon name="icon-menu-bookmark" />
          </div>
        </div>

        <div className="bookmark__divider"></div>

        <div className="bookmark__description">{b.description}</div>

        <div className="bookmark__tags">
          {b.tags.map((t) => (
            <div className="bookmark__tag">{t}</div>
          ))}
        </div>
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
          {isPinned && <Icon className="bookmark__pinned" name="icon-pin" />}

          {isArchived && <div className="bookmark__archived">archived</div>}
        </div>
      </div>
    </div>
  );
};
