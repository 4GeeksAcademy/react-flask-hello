import { div } from "framer-motion/client"
import SideBar from "../components/SideBar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../services/userServices";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const { store, dispatch } = useGlobalReducer()

    const [currentPath, setCurrentPath] = useState('/panel')
    const navigate = useNavigate();
    const { role } = useParams();
    const [userEmail, setUserEmail] = useState("")
    const [userToken, setUserToken] = useState("")
    const [userRole, setUserRole] = useState(role)



    useEffect(() => {
        /*
        userServices.dashboard().then((data) => {
            console.log("data-->", data)
            dispatch({ type: "save_user", payload: data })
            });
            */

        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'logged_in' })

            setUserRole(user.role)
            setUserEmail(user.email)
            setUserToken(user.token)

        }

    }, [store.auth, navigate]);



    return (
        <>
            {!store?.auth &&
                <div className="text-center p-5">
                    <h2>Esto es privado</h2>
                    <Link to={`/login`}>Login</Link>
                </div>
            }

            {store?.auth &&
                <div className="row d-flex align-items-stretch vh-100">
                    <div className="col-2 me-5 sidebar-container">
                        <SideBar
                            userRole={userRole}
                            userEmail={userEmail}



                        />
                    </div>
                    <div className="col-8 ms-2">

                        <Outlet />
                    </div>
                </div>
            }
        </>
    )


}

export default Dashboard