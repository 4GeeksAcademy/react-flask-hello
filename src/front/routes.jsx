import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import  ColorPalettePreview  from "./pages/ColorPalettePreview"
import {NotFound} from "./pages/NotFound"

export const router = createBrowserRouter(
    createRoutesFromElements(
    
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<NotFound/>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />        
        
        <Route path="/cpp" element={<ColorPalettePreview />} />
      </Route>
    )
);