// Import necessary components and functions from react-router-dom
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { SignUp } from "./pages/signUp";
import { GoogleApi } from "./pages/GoogleApi";
import { Search } from "./pages/Search";
import { Custom } from "./pages/Custom";
import { SignIn } from "./pages/signIn";
import { Password } from "./pages/password";
import { MainPage } from "./pages/mainpage";
import { Profile} from "./pages/Profile";
import { PrivateRoute } from "./components/PrivateRoute";
import { ResetPassword } from "./pages/ResetPassword";
import {PasswordRequestReset} from "./pages/passwordResetRequest";

import { Favorites } from "./pages/Favorites";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // Root Route: All navigation will start from Layout
    <Route path="/" element={<Layout />} errorElement={<h1>Not Found!</h1>}>

      {/* Nested Routes */}
      <Route index element={<Home />} /> {/* Default homepage */}
      <Route path="single/:theId" element={<Single />} /> {/* Dynamic route */}
      <Route path="demo" element={<Demo />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="search" element={<Search />} />
      <Route path="custom" element={<Custom />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="password" element={<Password />} />
      <Route path="mainpage" element={<MainPage />} />
      <Route path="google-api" element={<GoogleApi />} />
      <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="request-reset" element={<PasswordRequestReset/>} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);
