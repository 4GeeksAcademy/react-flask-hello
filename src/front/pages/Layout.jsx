import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="d-flex flex-column" style={{height: '100vh'}}>
                <Navbar />
                    <Outlet />
                <Footer />
            </div>
        </ScrollToTop>
    )
}