import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { RegistroForm } from "../components/RegistroForm"
import {APIProvider, useMap} from '@vis.gl/react-google-maps';

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Registro = () => {
    return (

        <RegistroForm />


    )
}