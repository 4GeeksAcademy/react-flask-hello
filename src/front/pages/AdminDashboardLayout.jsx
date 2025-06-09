import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { AdminDashboardNavbar } from "../components/AdminDashboardNavbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const AdminDashboardLayout = () => {
    return (
        <ScrollToTop>
            <AdminDashboardNavbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}