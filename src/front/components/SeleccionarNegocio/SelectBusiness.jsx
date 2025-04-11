import React, { useState, useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";

import "./SeleccionarNegocio.css"


export const SelectBusiness = () => {

	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (store.business.length === 0) {

			const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

			const fetchBusinesses = async () => {
				try {
					const response = await fetch(`${backendUrl}api/businesses`, {
						headers: {
							'Authorization': `Bearer ${store.token}`
						}
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error(data.error || 'Error loading businesses');
					}


					dispatch({
						type: "set_business",
						payload: data
					});

									
				} catch (error) {
					console.error("Error fetching businesses:", error);
					dispatch({
						type: "set_error",
						payload: error.message
					});
				}
			};

			fetchBusinesses();
		}
	}, [store.token]);


	const filteredBusinesses = store.business.filter(business =>
		business.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectBusiness = (business) => {
		dispatch({
			type: "select_business",
			payload: business
		});
	};

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
				{filteredBusinesses.map((business) => (
					<Link
						key={business.id}
						to={`/clients`}
						style={{ textDecoration: 'none' }}
						onClick={() => handleSelectBusiness(business)}
					>
						<div className="m-2 border border-black card col-4">
							<div className="m-2">
								<h5>{business.name}</h5>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};