import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Negocios from "./pages/Negocios";
import Home from "./pages/Home";
import ClientList from "./pages/ClientList";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/negocios" element={<Negocios />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<ClientList />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;