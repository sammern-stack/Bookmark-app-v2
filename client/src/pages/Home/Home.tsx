import { useStartApp } from "@/hooks";

import {
  Bookmarks,
  Header,
  Toast,
  CreateBookmarkForm,
  UpdateBookmarkForm,
} from "@/components/layout";
import { BookmarkSidebar } from "@/layout";

import "./Home.scss";

const Home = () => {
  useStartApp();

  return (
    <div className="home">
      <BookmarkSidebar />
      <div className="home__main-content">
        <Header />
        <Bookmarks />
      </div>
      <Toast />
      <CreateBookmarkForm />
      <UpdateBookmarkForm />
    </div>
  );
};

export default Home;
