// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { PublicLayout } from "./pages/PublicLayout";
import { Home } from "./pages/public_pages/Home";
import Auth from "./pages/public_pages/Auth";
import AboutUs from "./pages/public_pages/AboutUs"


export const PublicRoutes = ()=>{

return(

  
  // Root Route: All navigation will start from here.
  <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Route>

)
}