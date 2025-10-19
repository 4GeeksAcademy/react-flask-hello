import { div } from "framer-motion/client"
import SideBar from "../components/SideBar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../services/userServices";

const Dashboard = () => {
    const { store, dispatch } = useGlobalReducer()

    const [currentPath, setCurrentPath] = useState('/panel')
    const navigate = useNavigate();
    const { role } = useParams();



    const userRole = role || 'mentor';



/*
    useEffect(() => {

        userServices.dashboard().then((data) => {
            console.log("data-->", data)
            dispatch({ type: "save_user", payload: data })
        });
        
                const token = localStorage.getItem('token');
                if (!token || !store.auth) {
                    console.log("No hay sesión, redirigiendo a login");
                    navigate('/login', { replace: true });
                }
                    
    }, [store.auth, navigate]);

*/

    return (
        <>
            {!store?.auth &&
                <div className="text-center p-5">
                    <h2>Esto es privado</h2>
                    <Link to={`/login`}>Login</Link>
                </div>
            }

            {store?.auth &&
                <div className="row">
                    <div className="col-3">
                        <SideBar
                            userRole={userRole}

                        />
                    </div>
                    <div className="col-9">
                        <h2>Contenido</h2>
                    </div>
                </div>
            }
        </>
    )


}

export default Dashboard