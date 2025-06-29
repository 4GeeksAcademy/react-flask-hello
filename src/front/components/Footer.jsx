import React from 'react'
import logo from '../assets/img/SVG/logo.svg'
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
    <footer className=' container d-flex justify-content-between align-items-center p-3 my-4 border-top'>


      <ul className='nav'>
        <li className="nav-item">
          <a href="#" onClick={scrollToTop} className="nav-link px-2 text-white">Back top</a>
        </li>
        {/*<li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">Features</a>
        </li>        
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">About Us</a>
        </li>*/}
      </ul>

      <Link to="/">
        <img src={logo} style={{ width: '4rem', height: '4rem' }} />
      </Link>
      <span className="flex-center mb-5">
        <a className='nav-link text-white' href='https://github.com/4GeeksAcademy/EchoBoard-Proyecto-Final-4geeks' target='blank'>
          <span className='mx-2'>Repo</span>
          <img src={GHicon} style={{ width: '2rem', height: '2rem' }} />
        </a>
      </span>
    </footer>
  )
}
