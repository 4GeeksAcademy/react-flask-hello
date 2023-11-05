import React from "react";
import { Link } from "react-router-dom";
const Pricing =(props)=>{
    return(
        <div className="container">
          
        <div className="card mb-4 box-shadow">
          <div id="card-header" className="card-header">
            <h4 className="my-0 font-weight-normal">{props.planes}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{props.price} <small className="text-muted">/Month</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>{props.pack}</li>
              <li>{props.event}</li>
              <li>{props.event}</li>
              <li>{props.admi}</li>
              <li> {props.control}</li>
            </ul>
            <Link to="/payment" state={{price:props.price,plan:props.planes}}>
            <button type="button" className="btn btn-lg btn-block btn-outline-primary">Comprar</button>
            </Link>
          </div>
        </div>
        </div>
      
    );
}

export default Pricing;