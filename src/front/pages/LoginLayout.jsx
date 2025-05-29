import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Footer } from "../components/Footer"
import { LoginNavbar } from "../components/LoginNavbar"

export const LoginLayout = () => {
    return (
        <ScrollToTop>
            <LoginNavbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}