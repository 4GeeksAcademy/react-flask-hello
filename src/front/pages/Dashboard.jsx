import { div } from "framer-motion/client"
import SideBar from "../components/SideBar"
import { useState } from "react";


const Dashboard = () => {

    const [userRole, setUserRole] = useState('mentor')
    const [currentPath, setCurrentPath] = useState('/panel')

    return (

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


    )


}

export default Dashboard