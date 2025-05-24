
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Feed from "./pages/Feed"



export const router = createBrowserRouter(
  createRoutesFromElements(

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  )
);