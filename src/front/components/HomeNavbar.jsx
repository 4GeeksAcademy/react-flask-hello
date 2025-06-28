import React from 'react'
import logo from '../assets/img/SVG/logo.svg'
import { Link } from 'react-router-dom'


export const HomeNavbar = () => {
    const goTo = (id) => {
   document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
    return (
        <div className='container-fluid bg-white justify-content-around'>
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src={logo} alt="Logo" width="50" height="50" class="d-inline-block mx-2 " />
                EchoBoard
            </a>
            <ul className='nav '>
                <li className='nav-item'>
                    <button className='nav-link text-secondary' onClick={()=>{goTo('home')}}> Home</button>
                </li>
                <li className='nav-item '>
                    <button className='nav-link text-secondary' onClick={()=>{goTo('howitworks')}}> How it Works</button>
                </li>
                <li className='nav-item'>
                    <button className='nav-link text-secondary' onClick={()=>{goTo('ourteam')}}> Our Team</button>
                </li>

            </ul>
            <Link to="/">
            <button className='btn text-white' style={{background:"var(--green-500)"}}>Sing In</button>
            </Link>

        </div>
    )
}
