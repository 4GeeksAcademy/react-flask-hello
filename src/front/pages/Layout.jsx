import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ErrorAlert } from "../components/ErrorAlert";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Layout = () => {
    const { store, dispatch } = useGlobalReducer();

   
    const handleCloseError = () => dispatch({ type: "error", payload: null });

    return (
        <ScrollToTop>
            <Navbar />
            {/* Show error at the top */}
            <ErrorAlert error={store.error} onClose={handleCloseError} />
            <Outlet />
            <Footer />
        </ScrollToTop>
    );
};
