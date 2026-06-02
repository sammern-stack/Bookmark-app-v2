//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLoader } from "./components";

//—————————————————————————————————————————————————————————————————
// Lazy Loading pages
//—————————————————————————————————————————————————————————————————

const HomePage = lazy(() => import("./pages/Home/Home"));

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
