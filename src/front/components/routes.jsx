import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import { Layout } from "./pages/Layout";
  import { Home } from "./pages/Home";
  import { Login } from "./pages/Login";
  import { Register } from "./pages/Register";
  import { Profile } from "./pages/Profile";
  import { Tasks } from "./pages/Tasks";
  import { Error404 } from "./pages/Error404";
  import { PrivateRoute } from "./components/PrivateRoute";
  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error404 />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
  
        {/* Rutas protegidas */}
        <Route path="profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
  
        <Route path="tasks" element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        } />
      </Route>
    )
  );