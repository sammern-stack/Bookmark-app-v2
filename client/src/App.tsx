import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { useTheme } from "@/shared/hooks";
import { Dialog } from "./shared/components";

const HomePage = lazy(() => import("./pages/Home/Home"));
const LoadingPage = lazy(() => import("./pages/Loading/Loading"));

const App = () => {
  useTheme();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Dialog />
    </Suspense>
  );
};

export default App;
