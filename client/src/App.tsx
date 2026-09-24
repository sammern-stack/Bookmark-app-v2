import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { AppLoader } from "@/shared/components";
import { useThemeStore } from "@/shared/stores";
import { Dialog } from "./shared/components/Dialog/Dialog";

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
      <Dialog />
    </Suspense>
  );
};

export default App;
