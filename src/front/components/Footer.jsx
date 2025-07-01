import React from 'react'
import logo from '../assets/img/SVG/logo_v3.svg'
import GHicon from '../assets/img/SVG/GitHub.svg'
import { Link } from 'react-router-dom'

export const Footer = () => {

  let scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
  }


  return (
    <footer className=' container d-flex justify-content-between align-items-center px-3 my-4 border-top'>


      <ul className='nav'>
        <li className="nav-item">
          <a href="#" onClick={scrollToTop} className="nav-link px-2 text-white">Back top</a>
        </li>        
      </ul>

      <Link to="/">
        <img src={logo} style={{ width: '8rem', height: '8rem' }} />
      </Link>
      <span className="">
        <a className='nav-link text-white' href='https://github.com/4GeeksAcademy/EchoBoard-Proyecto-Final-4geeks' target='blank'>
          <span className='mx-2'>Repo</span>
          <img src={GHicon} style={{ width: '2rem', height: '2rem' }} />
        </a>
      </span>
    </footer>
  )
}
