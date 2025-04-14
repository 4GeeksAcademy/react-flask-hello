// 👆 ❇️ Riki for the group success 👊
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";
import { Login } from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dash_user from "./pages/Dash_user/Dash_user";
import Dash_admin from "./pages/Dash_admin/Dash_admin";
import Plot_form from "./pages/Plot_form/Plot_form";
import Landing from "./pages/Landing/Landing";
import Contact from "./pages/Contact/Contact";
import QuoteHistory from "./pages/Quote/QuoteHistory";
import Quote from "./pages/Quote/Quote";
import PdfDocument from "./components/Quote/PdfDocument";
import PdfDocumentWrapper from "./components/Quote/PdfDocumentWrapper";
import ProtectedRoute from ".//ProtectedRoute"; // 👈 Importa el nuevo componente

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Rutas públicas con PublicLayout */}
      <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="quotehistory" element={<QuoteHistory />} />
      </Route>

      {/* Rutas privadas con Layout y protección */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
        errorElement={<h1>Not found!</h1>}
      >
        <Route path="dashboard" element={<Dash_user />} />
        <Route path="dash_admin" element={<Dash_admin />} />
        <Route path="plot_form" element={<Plot_form />} />
        <Route path="quote" element={<Quote />} />
        <Route path="pdfdocument" element={<PdfDocument />} />
        <Route path="pdfdocumentwrapper" element={<PdfDocumentWrapper />} />
      </Route>

      {/* Ruta para redireccionar URLs no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);
