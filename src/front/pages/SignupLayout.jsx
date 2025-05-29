import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Footer } from "../components/Footer"
import { SignupNavbar } from "../components/SignupNavbar"

export const SignupLayout = () => {
    return (
        <ScrollToTop>
            <SignupNavbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}