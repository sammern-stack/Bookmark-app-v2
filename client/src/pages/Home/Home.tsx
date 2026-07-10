import { useStartApp } from "@/hooks";
import { useState } from "react";
import {
  Bookmarks,
  Toast,
  CreateBookmarkForm,
  UpdateBookmarkForm,
} from "@/components/layout";
import { BookmarkSidebar, PageHeader } from "@/layout";

import "./Home.scss";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useStartApp();

  return (
    <div className="home">
      <BookmarkSidebar isOpen={isSidebarOpen} />
      <div className="home__main-content">
        <PageHeader setSidebarOpen={setIsSidebarOpen} />
        <Bookmarks />
      </div>
      <Toast />
      <CreateBookmarkForm />
      <UpdateBookmarkForm />
    </div>
  );
};

export default Home;
