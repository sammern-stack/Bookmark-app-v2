import { useBookmarksStore } from "@/stores";
import { Icon, Dropdown } from "@/components/shared";
import { ProfileToggle } from "./ProfileToggle";
import { ProfileMenu } from "./ProfileMenu";
import "./styles.scss";

export const Header = () => {
  const openForm = useBookmarksStore((s) => s.openForm);

  const notDesktop = false;

  return (
    <div className="home__header">
      <div className="home__header-left">
        {notDesktop && <div className="home__hamburger-menu"></div>}

        <div className="home__search-bar">
          <Icon name="icon-search" />
          <input type="text" placeholder="Search by title..." />
        </div>
      </div>

      <div className="home__header-right">
        <button className="home__create-btn" onClick={() => openForm()}>
          <Icon name="icon-add" />
          <span>Add Bookmark</span>
        </button>

        <Dropdown
          className="home"
          toggleEl={<ProfileToggle />}
          menuEl={<ProfileMenu />}
        />
      </div>
    </div>
  );
};
