import { Outlet, useLocation } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    const location = useLocation();
    return (
        <ScrollToTop location={location}>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}