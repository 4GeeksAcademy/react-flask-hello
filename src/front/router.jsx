import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Content from "./pages/Content";
import { Profile } from "./pages/Profile";
import Landing  from "./pages/Landing";
import PrivateRoute from "./components/PrivateRoute";
import VideosCarousel from "./components/VideosCarousel";
import PodcastCarousel from "./components/PodcastCarousel";
import TasksCarousel from "./components/TasksCarousel";
import Profile2 from "./pages/Profile2";
import Onboarding from "./components/OnboardingContent";
import Journey from "../front/pages/Journey";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<h1>Not found!</h1>}>
      <Route index path="landing" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="content" element={<Content />} />
      <Route path="videoscarousel" element={<VideosCarousel />} />
      <Route path="podcastcarousel" element={<PodcastCarousel />} />
      <Route path="taskscarousel" element={<TasksCarousel />} />
      <Route path="profile2" element={<Profile2 />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="journey" element={<Journey />} />

      
      {/* Rutas protegidas */}
      <Route path="profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
    </Route>
  )
);