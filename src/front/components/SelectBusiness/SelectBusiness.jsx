import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";

import "./SelectBusiness.css"

export const SelectBusiness = ({ searchTerm = "" }) => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();



	useEffect(() => {
		{
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
		
		<div className="business-container ">
			{filteredBusinesses.map((business) => (
				<Link
					key={business.id}
					to={`/calendar`}
					className="business-card-link"
					onClick={() => handleSelectBusiness(business)}
				>
					<div className="business-card">
						<h5 className="business-name">{business.name}</h5>
					</div>
				</Link>
			))}
		</div>

	);
};