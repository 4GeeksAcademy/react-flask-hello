import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Feed from "./pages/Feed";
import PrivateRoute from "./components/PrivateRoute"; // 👈

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
<<<<<<< HEAD
          // <PrivateRoute>
          <Profile />
          // </PrivateRoute>
=======
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
>>>>>>> 5912055cd1abaf902bb773db1d7e2560e9d0254f
        }
      />
      <Route
        path="/feed"
        element={
<<<<<<< HEAD
          //<PrivateRoute>
          <Feed />
          //</PrivateRoute>
=======
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
>>>>>>> 5912055cd1abaf902bb773db1d7e2560e9d0254f
        }
      />
    </>
  )
);
