import React from "react";
import { useLocation } from "react-router-dom";


const Payment=()=>{ 
       const location=useLocation();
       const{price,plan}=location.state;
    return(
        <div className="container p-0">
        <div className="card px-4">
            <p className="h8 py-3">Payment Details {plan}</p>
            <div className="row gx-3">
                <div className="col-12">
                    <div className="d-flex flex-column">
                        <p className="text mb-1">Person Name</p>
                        <input className="form-control mb-3" type="text" placeholder="Name"/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-flex flex-column">
                        <p className="text mb-1">Card Number</p>
                        <input className="form-control mb-3" type="text" placeholder="1234 5678 435678"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column">
                        <p className="text mb-1">Expiry</p>
                        <input className="form-control mb-3" type="text" placeholder="MM/YYYY"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column">
                        <p className="text mb-1">CVV/CVC</p>
                        <input className="form-control mb-3 pt-2 " type="password" placeholder="***"/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="btn btn-primary mb-3">
                        <span className="ps-3">Pay {price}</span>
                        <span className="fas fa-arrow-right"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Payment;