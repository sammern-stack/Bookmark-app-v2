import { useStartApp } from "@/hooks";

import {
  Bookmarks,
  Header,
  Sidebar,
  Toast,
  CreateBookmarkForm,
  UpdateBookmarkForm
} from "@/components/layout";

import "./Home.scss";

const Home = () => {
  useStartApp();

  return (
    <div className="home">
      <Sidebar />

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
