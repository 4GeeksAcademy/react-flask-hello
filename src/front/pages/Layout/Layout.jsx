import { Outlet } from "react-router-dom"
import ScrollToTop from "../../components/ScrollToTop"
import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"
import { useEffect } from "react"
import "./Layout.css" 

export const Layout = () => {

    useEffect(() => {
        
        const createStars = (num) => {

            const container = document.querySelector(".stars-container");
            
            container.innerHTML = '';
            for (let i = 0; i < num; i++) {
                const star = document.createElement("div");
                star.className = "star";
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                container.appendChild(star);
            }
        };
        createStars(350);
    }, []);

    return (
        <ScrollToTop>
            <div className="layout-container">
                <div className="stars-container"></div>
                <div className="content-wrapper">
                    <Navbar />
                    <main className="main-content">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </ScrollToTop>
    )
}