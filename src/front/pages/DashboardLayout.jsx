import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { DashboardNavbar } from "../components/DashboardNavbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const DashboardLayout = () => {
    return (
        <ScrollToTop>
            <DashboardNavbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}