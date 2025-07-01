import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import ColorPalettePreview from "./pages/ColorPalettePreview";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { App } from "./pages/App";
import { NewProject } from "./pages/NewProject";
import Dashboard from "./pages/Dashboard"; 

// Import global reducer/context hook
import useGlobalReducer from "./hooks/useGlobalReducer";

// 🔒 Protects private routes
function PrivateRoute({ children }) {
  const { store } = useGlobalReducer();
  return store.token ? children : <Navigate to="/login" />;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="/cpp" element={<ColorPalettePreview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/newproject" element={<NewProject />} />   
      <Route path="/app" element={<App />} />

      {/* Private routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Route>
  )
);




