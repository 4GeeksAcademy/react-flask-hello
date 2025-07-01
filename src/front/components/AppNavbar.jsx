import React from 'react'
import logo from '../assets/img/SVG/logo_v5.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const AppNavbar = () => {

    const [access, setAccess] = useState(true) // set to "true" si esta indentificado o singed in 


    return (
        <div className='container-fluid mx-5 py-1'>
            <a class="navbar-brand d-flex align-items-center text-white" href="/">
                <img src={logo} alt="Logo" style={{ width: '4rem', height: '4rem' }} class="d-inline-block mx-2 " />
                EchoBoard
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                {!access && <Link to="/" className='shadow-lg ms-auto '>
                    <button className='btn text-white' style={{ background: "var(--green-500)" }}>Sing In</button>
                </Link>}

                {access && <div className='dropdown-center ms-auto me-2'>
                    <button className='ms-auto text-white home-tech rounded-circle portrait    flex-center'
                        type="button" data-bs-toggle="dropdown"
                        style={{ height: "5vh", position: 'relative' }}
                    > P
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <Link to='/'>
                            <button class="dropdown-item text-danger text-end " >
                            Log out
                            </button>
                            </Link>
                        </li>

                    </ul>
                </div>}

            </div>
        </div>

    )
}
