import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { AppLoader } from "@/shared/components";

const HomePage = lazy(() => import("./pages/Home/Home"));

const App = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
