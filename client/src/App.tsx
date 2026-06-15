// ——— Imports —————————————————————————————————————————————————————————————————
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLoader } from "./components/common";

// ——— Pages with lazy loading —————————————————————————————————————————————————
const HomePage = lazy(() => import("./pages/Home/Home"));

// ——— App Component ———————————————————————————————————————————————————————————
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
