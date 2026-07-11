import { useStartApp } from "@/hooks";
import { useState } from "react";
import {
  Toast,
  CreateBookmarkForm,
  UpdateBookmarkForm,
} from "@/components/layout";
import { BookmarkSidebar, BookmarkContent, PageHeader } from "@/layout";

import "./Home.scss";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useStartApp();

  return (
    <div className="home">
      <BookmarkSidebar isOpen={isSidebarOpen} />
      <PageHeader setSidebarOpen={setIsSidebarOpen} />
      <BookmarkContent />
      <CreateBookmarkForm />
      <UpdateBookmarkForm />
      <Toast />
    </div>
  );
};

export default Home;
