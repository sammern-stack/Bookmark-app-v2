import { useStartApp } from "@/hooks";
import { Toast } from "@/shared/components";
import { BookmarkSidebar, BookmarkContent, PageHeader } from "@/layout";
import { BookmarkCreateForm, BookmarkUpdateForm } from "@/features/bookmark";

import "./Home.scss";

const Home = () => {
  useStartApp();

  return (
    <div className="home">
      <BookmarkSidebar />
      <PageHeader />
      <BookmarkContent />
      <BookmarkCreateForm />
      <BookmarkUpdateForm />
      <Toast />
    </div>
  );
};

export default Home;
