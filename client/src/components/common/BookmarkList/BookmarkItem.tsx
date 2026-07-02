import type { BookmarkModel } from "@/types";
import { Dropdown, Icon, Label } from "@/components/shared";
import { BookmarkMenu } from "./BookmarkMenu";
import { formatDate, formatUrl } from "@utils/formatters";
import "./styles.scss";

interface BookmarkItemProps {
  bookmark: BookmarkModel;
}

export const BookmarkItem = ({ bookmark: b }: BookmarkItemProps) => (
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
          <Label className="bookmark__title" label={b.title} />
          <Label className="bookmark__url" label={formatUrl(b.url)} />
        </div>

        <Dropdown
          className="bookmark"
          toggleEl={<Icon name="icon-menu-bookmark" />}
          menuEl={<BookmarkMenu bookmark={b} />}
        />
      </div>

      <div className="bookmark__divider"></div>

      <Label className="bookmark__description" label={b.description} />

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
        <Label label={b.visitCount} icon="icon-visit-count" />
        <Label label={formatDate(b.lastVisited)} icon="icon-last-visited" />
        <Label label={formatDate(b.createdAt)} icon="icon-created" />
      </div>

      <div className="bookmark__state">
        {b.pinned && <Icon className="bookmark__pinned" name="icon-pin" />}
        {b.isArchived && <div className="bookmark__archived">Archived</div>}
      </div>
    </div>
  </div>
);
