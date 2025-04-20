import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
import Cart from "./pages/cart";
import Shop from "./pages/shop"; /*Modificado Javi*/ 
import InventoryPanel from "./pages/Admin/InventoryPanel"; 
import StoreSettings from "./pages/Admin/StoreSettings"; 

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<PageRegister />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} /> 
      <Route path="/demo" element={<Demo />} />
      {/* Redirección de settings a inventory */}
      <Route path="/settings" element={<InventoryPanel />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />{/*Modificado Javi*/ }
      <Route path="/inventory" element={<InventoryPanel />} /> 
      <Route path="/admin/store-settings" element={<StoreSettings />} /> 
    </Route>
  )
);