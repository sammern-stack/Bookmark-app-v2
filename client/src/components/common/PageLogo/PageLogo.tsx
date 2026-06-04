import { CiBookmark } from "react-icons/ci";
import "./style.scss";

export const PageLogo = () => (
  <div className="home__logo">
    <div className="home__logo-icon">
      <CiBookmark />
    </div>

    <div className="home__logo-title">Bookmark Manager</div>
  </div>
);
