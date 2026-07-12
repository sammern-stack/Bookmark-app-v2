import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { AppLoader } from "@/shared/components";
import { useThemeStore } from "@/shared/stores";

const HomePage = lazy(() => import("./pages/Home/Home"));

const App = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
