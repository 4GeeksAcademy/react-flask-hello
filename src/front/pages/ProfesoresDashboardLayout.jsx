import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { ProfesoresDashboardNavbar } from "../components/ProfesoresDashboardNavbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const ProfesoresDashboardLayout = () => {
    return (
        <ScrollToTop>
            <ProfesoresDashboardNavbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}