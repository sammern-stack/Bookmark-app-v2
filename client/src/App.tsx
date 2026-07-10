// ——— Imports —————————————————————————————————————————————————————————————————
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import { AppLoader } from "./components/common";

// ——— Pages with lazy loading —————————————————————————————————————————————————
const HomePage = lazy(() => import("./pages/Home/Home"));

// ——— App Component ———————————————————————————————————————————————————————————
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
