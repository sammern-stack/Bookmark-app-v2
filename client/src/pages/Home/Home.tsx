import { Toast } from "@/shared/components";
import { BookmarkSidebar, BookmarkContent, PageHeader } from "@/layout";
import { BookmarkForm } from "@/features/bookmark";
import { useUIVisibilityStore } from "@/shared/stores";

import "./Home.scss";
import { useShallow } from "zustand/shallow";

const Home = () => {
  const { createFormFlag, updateFormFlag } = useUIVisibilityStore(
    useShallow((s) => ({
      createFormFlag: s.visibilityFlags.createForm,
      updateFormFlag: s.visibilityFlags.updateForm,
    })),
  );

  return (
    <div className="home">
      <BookmarkSidebar />
      <PageHeader />
      <BookmarkContent />
      <BookmarkForm />
      <Toast />

      {(createFormFlag || updateFormFlag) && (
        <div className="home__backdrop"></div>
      )}
    </div>
  );
};

export default Home;
