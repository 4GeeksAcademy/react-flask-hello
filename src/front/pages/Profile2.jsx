import "../assets/styles/profile.css";
import Navbar from "../components/Navbar";

const Profile2 = () => {
    return(
    <div className="page">
        <div className="content-left">
            <div className="data">
                <h3>David Castillo</h3>
                <h3>Architect</h3>
                <h3>Barcelona</h3>
            </div>
            <div className="tasks">
                <h2>Today's Tasks</h2>
            </div>
        </div>
        <div className="content-middle">
            <div className="navbar">
            </div>
            <div className="welcome">
                <div className="welcome-text">
                    <h1>Hello David!</h1>
                    <h2>Lorem ipsum lorem impsum</h2>
                    <h3>Lorem ipsum lorem impsum</h3>
                    <div className="see-journey">
                        See your journey
                    </div>
                </div>
                <div className="welcome-moty">
                    <img src="src/front/assets/styles/images/Confeti.webp" alt="moty" />
                </div>
            </div>
            <div className="cards-wrapper">
                    <div className="card x1">
                        <h2>Lou Logico</h2>
                    </div>
                    <div className="card x2">
                        <h2>Lou Logico</h2>
                    </div>
            </div>
        </div>
        <div className="content-right">
            <div className="progress-card">
                <img src="src/front/assets/styles/images/ProgressBar.png" alt="progress-bar" />
            </div>
            <div className="calendar">
            </div>
            <div className="cards_right x4">
                <h2>Lou Logico</h2>
            </div>
            <div className="cards_right x3">
                <h2>Lou Logico</h2>
            </div>
        </div>
    </div>
    );
};

export default Profile2;