import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useThemeStore } from "@/shared/stores";
import { Dialog } from "./shared/components/Dialog/Dialog";

const HomePage = lazy(() => import("./pages/Home/Home"));
const LoadingPage = lazy(() => import("./pages/Loading/Loading"));

const App = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
