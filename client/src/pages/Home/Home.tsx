import { Toast } from "@/shared/components";
import { BookmarkSidebar, BookmarkContent, PageHeader } from "@/layout";
import { BookmarkCreateForm, BookmarkUpdateForm } from "@/features/bookmark";
import { useUIVisibilityStore } from "@/shared/stores";

import "./Home.scss";

const Home = () => {
  const createFormFlag = useUIVisibilityStore(
    (s) => s.visibilityFlags.createForm,
  );

  const updateFormFlag = useUIVisibilityStore(
    (s) => s.visibilityFlags.updateForm,
  );

  return (
    <div className="home">
      <BookmarkSidebar />
      <PageHeader />
      <BookmarkContent />
      <BookmarkCreateForm />
      <BookmarkUpdateForm />
      <Toast />

      {(createFormFlag || updateFormFlag) && (
        <div className="home__backdrop"></div>
      )}
    </div>
  );
};

export default Home;
