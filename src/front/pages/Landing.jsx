import AnimatedPage from "../components/AnimatedPage";
import "../assets/styles/landing.css";

export const Landing = () => {
    return (
        <AnimatedPage>
            <div className="landing-page">
                <h1>Welcome to LEVEL UP</h1>
                <p>This is your dashboard.</p>
            </div>
        </AnimatedPage>
    );
};