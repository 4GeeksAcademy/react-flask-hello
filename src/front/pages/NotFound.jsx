import React from 'react'
import notFound from "../assets/img/SVG/404.svg"
import { Link } from 'react-router-dom'


export const NotFound = () => {
  return (
    <div className='flex-center not-found-container'>
      <div className="not-found-number">404</div>
      <img
        src={notFound}
        alt="Bootstrap Icon"
        style={{ width: '80vw', height: '80vh' }}
      />
      <div className='fixed-bottom text-center mb-4'>
        <p className="not-found-message">Seams there is nothing here</p>
        <Link to="/">
          <button className="btn btn-info text-white" >
            Return Home
          </button>
        </Link>
      </div>
    </div>
  )
}
