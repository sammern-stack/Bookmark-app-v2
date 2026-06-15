import { Icon } from "@/components/shared";

export const BookmarkMenu = () => {
  return (
    <>
      <div className="bookmark__menu-item">
        <Icon name="icon-visit" />
        Visit
      </div>

      <div className="bookmark__menu-item">
        <Icon name="icon-copy" />
        Copy URL
      </div>

      <div className="bookmark__menu-item">
        <Icon name="icon-pin" />
        Pin
      </div>

      <div className="bookmark__menu-item">
        <Icon name="icon-edit" />
        Edit
      </div>

      <div className="bookmark__menu-item">
        <Icon name="icon-archive" />
        Archive
      </div>
    </>
  );
};
