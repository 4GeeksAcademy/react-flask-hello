// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Register from "./components/Register";
import RegisterPage from "./pages/RegisterPage";
import Login from "./components/Login";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Panel from "./components/Panel";
import ViewSessions from "./components/ViewSessions";
import Messages from "./components/Messages";
import Reviews from "./components/Reviews";
import ConfigurationMentor from "./components/ConfigurationMentor";
import Services from "./components/Services";
import ManageSessions from "./components/ManageSessions";
import Finance from "./components/Finance";
import ConfigurationStudent from "./components/ConfigurationStudent";
import SearchMentor from "./pages/SearchMentor";
import RequestPasswordReset from "./components/RequestPasswordReset";
import ResetPassword from "./components/ResetPassword";


import ViewProfile from "./pages/ViewProfile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search-mentor" element={<SearchMentor />} />
      {/*reset email*/}
      <Route path="/request-password-reset" element={<RequestPasswordReset />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/view-mentor/:id" element={<ViewProfile />} />

      <Route path="/dashboard/:role/*" element={<Dashboard />}>
        <Route path="panel" element={<Panel />} />
        <Route path="sessions/view" element={<ViewSessions />} />
        <Route path="messages" element={<Messages />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="configurationmentor" element={<ConfigurationMentor />} />
        <Route path="configurationstudent" element={<ConfigurationStudent />} />
        <Route path="services" element={<Services />} />
        <Route path="sessions/manage" element={<ManageSessions />} />
        <Route path="finance" element={<Finance />} />
      </Route>

    </Route>
  )
);
