import "../assets/styles/journey.css";
import AnimatedPage from "../components/AnimatedPage";
import Navbar from "../components/Navbar";

const Journey = () => {
    return (
        <AnimatedPage>
            <div className="journey_container">
                <div className="navbar">
                    <Navbar></Navbar>
                </div>
                <div className="content">
                    <div className="menu_month">
                        <div className="menu_text">
                            <h3>May</h3>
                            <p>Week 1</p>
                            <p>Week 2</p>
                            <p>Week 3</p>
                            <p>Week 4</p>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="button">
                            <div className="card card1">
                                <img src="src/front/assets/styles/images/Alegre1.webp" alt="moty_alegre" />
                            </div>
                            <div className="card card2"></div>
                            <div className="card card3"></div>
                            <div className="card card3"></div>
                            <div className="card card3"></div>
                            <div className="card card3"></div>
                            <div className="card card3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Journey;