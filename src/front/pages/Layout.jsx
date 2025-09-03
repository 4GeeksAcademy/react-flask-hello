import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import Navbar from "../components/Navbar"
import { Footer } from "../components/footer/Footer"
import { useState } from "react"

export const Layout = () => {
    const [showDrowpdown, setShowDrowpdown] = useState(false)
    return (
        <ScrollToTop>
            <Navbar showDrowpdown={showDrowpdown} setShowDrowpdown={setShowDrowpdown} />
            <div onClick={() => setShowDrowpdown(false)}>
            
               <Outlet />
            </div>   
            <Footer />
        </ScrollToTop>
    )
}