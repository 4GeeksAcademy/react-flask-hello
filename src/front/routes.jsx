import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";

import ColorPalettePreview from "./pages/ColorPalettePreview";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login"; 
import { useContext } from "react";
import { Context } from "./store/appContext";
import { App } from "./pages/App";
// 🔒 Protects private routes
function PrivateRoute({ children }) {
  const { store } = useContext(Context);
  return store.token ? children : <Navigate to="/login" />;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="/cpp" element={<ColorPalettePreview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<App/>} />



      {/* Private routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <div>This is a protected Dashboard.</div>
          </PrivateRoute>
        }
      />
    </Route>
  )
);

