import ScrollToTop from "../components/ScrollToTop";
import Navbar2 from "../components/Navbar2";
import Category from "../components/Category";
import "../assets/styles/content.css";
import VideosCarousel from "../components/VideosCarousel";
import PodcastCarousel from "../components/PodcastCarousel";
import TasksCarousel from "../components/TasksCarousel";

const Content = () => {
  return (
    <ScrollToTop>
      <div className="content-wrapper">
        <Navbar2 />
        <div className="content-container">
          <Category />
          <div className="content-main">
            <VideosCarousel />
            <PodcastCarousel />
            <TasksCarousel />
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default Content;
