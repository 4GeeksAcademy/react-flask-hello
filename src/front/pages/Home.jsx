import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Features1 } from "../components/Features1";
import StartShopping from "../components/Call"; 
import GenerateQr  from "../components/GenerateQr.jsx";
import { SingleProduct } from "../components/singleProduct.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");
      const response = await fetch(backendUrl + "/api/hello");
      const data = await response.json();
      if (response.ok) dispatch({ type: "set_hello", payload: data.message });
      return data;
    } catch (error) {
      if (error.message)
        throw new Error(
          `Could not fetch the message from the backend.
          Please check if the backend is running and the backend port is public.`
        );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <Features1 />
      
      <GenerateQr/>
      <StartShopping />
    </>
  );
};

