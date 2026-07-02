import type { BookmarkModel } from "@/types";
import { Dropdown, Icon } from "@/components/shared";
import { BookmarkMenu } from "./BookmarkMenu";
import { formatDate, formatUrl } from "@utils/formatters";
import "./styles.scss";

interface BookmarkItemProps {
  bookmark: BookmarkModel;
}

export const BookmarkItem = ({ bookmark: b }: BookmarkItemProps) => {
  return (
    <div className="bookmark">
      <div className="bookmark__content">
        <div className="bookmark__header">
          <div
            className="bookmark__logo"
            style={{
              backgroundImage: `url(${b.favicon})`,
            }}
          ></div>

          <div className="bookmark__info">
            <div className="bookmark__title">{b.title}</div>
            <div className="bookmark__url">{formatUrl(b.url)}</div>
          </div>

          <Dropdown
            className="bookmark"
            toggleEl={<Icon name="icon-menu-bookmark" />}
            menuEl={<BookmarkMenu bookmark={b} />}
          />
        </div>

        <div className="bookmark__divider"></div>

        <div className="bookmark__description">{b.description}</div>

        <div className="bookmark__tags">
          {b.tags.map((t) => (
            <div className="bookmark__tag" key={t}>
              {t}
            </div>
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
            {formatDate(b.lastVisited)}
          </div>

          <div className="bookmark__created">
            <Icon name="icon-created" />
            {formatDate(b.createdAt)}
          </div>
        </div>

        <div className="bookmark__state">
          {b.pinned && <Icon className="bookmark__pinned" name="icon-pin" />}
          {b.isArchived && <div className="bookmark__archived">Archived</div>}
        </div>
      </div>
    </div>
  );
};
