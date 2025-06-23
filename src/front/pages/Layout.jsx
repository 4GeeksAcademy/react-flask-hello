import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <main className="container my-4">
                <Outlet />
            <Footer />
            </main>
        </ScrollToTop>
    )
}

export default Layout;

