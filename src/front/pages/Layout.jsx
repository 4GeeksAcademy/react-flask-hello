import { Outlet, useLocation } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location = useLocation()
    const hideLayoutPaths = ["/dashboard"]

    const hideLayout = hideLayoutPaths.includes(location.pathname)

    return (
        <ScrollToTop>
            {!hideLayout && <Navbar />}
            <Outlet />

            {!hideLayout && <Footer />}
        </ScrollToTop>
    )
}