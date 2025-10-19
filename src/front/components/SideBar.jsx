import React, { useMemo, useState } from "react"
import { LayoutDashboard, Settings, MessageSquare, Star, Briefcase, Calendar, DollarSign, Eye } from 'lucide-react';
import MenuItem from "./MenuItem";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const PERMISSIONS = {
    PANEL_VIEW: 'panel:view',
    CONFIGURATION_VIEW: 'configuration:view',
    MESSAGES_VIEW: 'messages:view',
    REVIEWS_VIEW: 'reviews:view',
    SERVICES_VIEW: 'services:view',
    MANAGE_SESSIONS_VIEW: 'sessions:manage',
    FINANCE_VIEW: 'finance:view',
    SESSIONS_VIEW: 'sessions:view'
}


const ROLES = {

    mentor: [
        PERMISSIONS.PANEL_VIEW,
        PERMISSIONS.CONFIGURATION_VIEW,
        PERMISSIONS.MESSAGES_VIEW,
        PERMISSIONS.REVIEWS_VIEW,
        PERMISSIONS.SERVICES_VIEW,
        PERMISSIONS.MANAGE_SESSIONS_VIEW,
        PERMISSIONS.FINANCE_VIEW
    ],

    student: [
        PERMISSIONS.PANEL_VIEW,
        PERMISSIONS.CONFIGURATION_VIEW,
        PERMISSIONS.MESSAGES_VIEW,
        PERMISSIONS.REVIEWS_VIEW,
        PERMISSIONS.SESSIONS_VIEW
    ]

}

const MENU_ITEMS = [

    {
        id: 'panel',
        label: 'Panel',
        icon: LayoutDashboard,
        path: '/panel',
        permission: PERMISSIONS.PANEL_VIEW
    },

    {
        id: 'services',
        label: 'Mis servicios',
        icon: Briefcase,
        path: '/services',
        permission: PERMISSIONS.SERVICES_VIEW
    },

    {
        id: 'manageSessions',
        label: 'Gestionar sesiones',
        icon: Calendar,
        path: '/sessions/manage',
        permission: PERMISSIONS.MANAGE_SESSIONS_VIEW
    },

    {
        id: 'sessionsView',
        label: 'Ver sesiones',
        icon: Eye,
        path: '/sessions/view',
        permission: PERMISSIONS.SESSIONS_VIEW
    },

    {
        id: 'finance',
        label: 'Finanzas',
        icon: DollarSign,
        path: '/finance',
        permission: PERMISSIONS.FINANCE_VIEW
    },

    {
        id: 'messages',
        label: 'Mensajes',
        icon: MessageSquare,
        path: '/messages',
        permission: PERMISSIONS.MESSAGES_VIEW
    },

    {
        id: 'reviews',
        label: 'Reseñas',
        icon: Star,
        path: '/reviews',
        permission: PERMISSIONS.REVIEWS_VIEW
    },

    {
        id: 'configuration',
        label: 'Configuración de la cuenta',
        icon: Settings,
        path: '/configuration',
        permission: PERMISSIONS.CONFIGURATION_VIEW
    }

]



const havePermission = (userPermissions, permissionRequired) => {
    return userPermissions.includes(permissionRequired)
}


const filterMenuItem = (item, userPermissions) => {
    if (item.permission && !havePermission(userPermissions, item.permission)) {
        return null
    }

    return item
}

const filterFullMenu = (menuItems, userPermissions) => {
    const menuFiltered = [];

    for (const item of menuItems) {
        const itemFiltered = filterMenuItem(item, userPermissions)

        if (itemFiltered !== null) {
            menuFiltered.push(itemFiltered)
        }

        console.log("menu->>>", menuFiltered)
    }
    return menuFiltered

}


const menuFiltered = (userRole) => {
    return useMemo(() => {
        const permissionUser = ROLES[userRole] || [];
        return filterFullMenu(MENU_ITEMS, permissionUser)

    }, [userRole]);

}


const SideBar = ({ userRole }) => {
    const [currentPath, setCurrentPath] = useState('/panel');
    const {store, dispatch} = useGlobalReducer()


    const menu = menuFiltered(userRole)





    return (
        <>
            <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">Toggle offcanvas</button>
            <div className="offcanvas-lg offcanvas-end sidebar" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                </div>
                <Link to="/" className="d-flex align-items-center text-decoration-none">
                    <div className="d-flex justify-content-center gap-2 p-2">
                        <img className="w-25 mt-3" src={store.icon} />
                        <p className="fs-5 mb-0 text-white mt-3">{store.nameApp}</p>
                    </div>
                </Link>
                       
                <div className="offcanvas-body vh-100 ">
                    <nav className="style-nav">
                        {menu?.map(item => (
                            <MenuItem
                                key={item.id}
                                item={item}
                                isActive={currentPath === item.path}
                                onClick={setCurrentPath}
                            />
                        ))}




                    </nav>
                </div>
            </div>
        </>
    )
}

export default SideBar