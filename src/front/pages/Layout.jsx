import { Outlet, useLocation } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { NavbarUser } from "../components/navbarUser"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {

    const location = useLocation()

    const userAreaRoutes =  [ 
        "/User",
        "/Profesores",
        "/checkout",
        "/Login"
    ]

    const showUserNavbar = userAreaRoutes.includes(location.pathname)





    return (
        <ScrollToTop>
             <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}