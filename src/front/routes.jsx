import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Negocios from "./pages/Negocios";



const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path = "/negocios" element = {<Negocios/>} />
        </Routes>
    );
};

export default AppRoutes;