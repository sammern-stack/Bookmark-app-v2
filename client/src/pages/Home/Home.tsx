import { useStartApp } from "@/hooks";
import { Bookmarks, Header, Sidebar, Toast } from "@/components/layout";
import "./Home.scss";

const Home = () => {
  useStartApp();

  return (
    <div className="home">
      <Sidebar />

      <div className="home__main-content">
        <Header />

        <Bookmarks />
      </div>

      <Toast />
    </div>
  );
};

export default Home;
