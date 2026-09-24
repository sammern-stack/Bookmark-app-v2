import { Toast } from "@/shared/components";
import { BookmarkSidebar, BookmarkContent, PageHeader } from "@/layout";

import "./Home.scss";

const Home = () => {
 return (
    <div className="home">
      <BookmarkSidebar />
      <PageHeader />
      <BookmarkContent />
      <Toast />
    </div>
  );
};

export default Home;
