import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";

import "./SeleccionarNegocio.css"


export const SeleccionarNegocio = () => {

	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	const [searchTerm, setSearchTerm] = useState("");
	const [businesses, setBusinesses] = useState ([]);

  const filteredBusinesses = businesses.filter ( business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

	return (
		<>
			<div>
				<h5>Searcher:</h5>
				<input 
					type="text" 
					value={searchTerm} 
					onChange={(e) => setSearchTerm(e.target.value)} 
				/>
			</div>
			<div className="row">
				{filteredBusinesses.map((busines) => (
					<Link 
						key={business.id} 
						to={`/negocios/${business.id}`} 
						style={{ textDecoration: 'none' }}
					>
						<div className="m-2 border border-black card col-3">
								<card className="m-2">
										<h5>{business.name}</h5>
								</card>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};