import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <div className="col-sm-6 shadow">
      <div className="card">
        <img src="https://wgmimedia.com/wp-content/uploads/2023/05/Screenshot-2023-05-03-201700.jpg" className="card-img-top" alt="img" />
        <div className="card-body">
          <h5 className="card-title">Rihanie</h5>
          <p className="card-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta nulla nesciunt molestiae error facilis veniam suscipit laboriosam reprehenderit ab! Quam alias ea repudiandae, vitae laudantium ducimus iure quae aliquam voluptates.
          </p>
          <Link  to="/" className="btn btn-primary">
            Contactar al vendedor
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card