import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	// const CompleteProfileForm = () => {
	// 	return (
	// 	  <section className="vh-100" style={{ backgroundColor: '#2779e2' }}>
	// 		<div className="container h-100">
	// 		  <div className="row d-flex justify-content-center align-items-center h-100">
	// 			<div className="col-xl-9">
	// 			  <h1 className="text-white mb-4">Edit Profile</h1>
	// 			  <div className="card" style={{ borderRadius: '15px' }}>
	// 				<div className="card-body">
	// 				  <div className="row align-items-center pt-4 pb-3">
	// 					<div className="col-md-3 ps-5">
	// 					  <h6 className="mb-0">Full name</h6>
	// 					</div>
	// 					<div className="col-md-9 pe-5">
	// 					  <input type="text" className="form-control form-control-lg" />
	// 					</div>
	// 				  </div>
	// 				  <hr className="mx-n3" />
	// 				  <div className="row align-items-center py-3">
	// 					<div className="col-md-3 ps-5">
	// 					  <h6 className="mb-0">Email address</h6>
	// 					</div>
	// 					<div className="col-md-9 pe-5">
	// 					  <input type="email" className="form-control form-control-lg" placeholder="example@example.com" />
	// 					</div>
	// 				  </div>
	// 				  <hr className="mx-n3" />
	// 				  <div className="row align-items-center py-3">
	// 					<div className="col-md-3 ps-5">
	// 					  <h6 className="mb-0">Full name</h6>
	// 					</div>
	// 					<div className="col-md-9 pe-5">
	// 					  <textarea className="form-control" rows="3" placeholder="Message sent to the employer"></textarea>
	// 					</div>
	// 				  </div>
	// 				  <hr className="mx-n3" />
	// 				  <div className="row align-items-center py-3">
	// 					<div className="col-md-3 ps-5">
	// 					  <h6 className="mb-0">Upload Photos</h6>
	// 					</div>
	// 					<div className="col-md-9 pe-5">
	// 					  <input className="form-control form-control-lg" id="formFileLg" type="file" />
	// 					  <div className="small text-muted mt-2">Upload your progress photos. Max file size 50 MB</div>
	// 					</div>
	// 				  </div>
	// 				  <hr className="mx-n3" />
	// 				  <div className="px-5 py-4">
	// 					<button type="submit" className="btn btn-primary btn-lg">Upload Photos</button>
	// 				  </div>
	// 				</div>
	// 			  </div>
	// 			</div>
	// 		  </div>
	// 		</div>
	// 	  </section>
	// 	);
	//   };
	  
	  
	return (
		<div className="jumbotron">
			<h1 className="display-4">This will show the demo element: {store.demo[params.theid].title}</h1>
			<img src={rigoImageUrl} />
			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};


Single.propTypes = {
	match: PropTypes.object
};

// export default CompleteProfileForm;