import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./AddBusinessModal.css"; // Importing our custom CSS

export const AddBusinessModal = () => {
	const { store } = useGlobalReducer();
	const [newBusiness, setNewBusiness] = useState({
		name: "",
		tax_id: "",
		postal_code: ""
	});
	const [businessErrorMessage, setBusinessErrorMessage] = useState("");
	const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

	const handleNewBusinessChange = (e) => {
		const { name, value } = e.target;
		setNewBusiness({
			...newBusiness,
			[name]: value
		});
	};

	const handleNewBusinessSubmit = async (e) => {
		e.preventDefault();
		setBusinessErrorMessage("");

		try {
			const response = await fetch(`${backendUrl}api/businesses`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${store.token}`
				},
				body: JSON.stringify(newBusiness)
			});

			const data = await response.json();

			if (!response.ok) {
				setBusinessErrorMessage(data.error || "Error creating business");
				return;
			}

			console.log("Business created:", data);

			setNewBusiness({
				name: "",
				tax_id: "",
				postal_code: ""
			});

			document.getElementById('closeNewBusinessModal').click();

		} catch (error) {
			console.error("Error:", error);
			setBusinessErrorMessage("Connection error with server");
		}
	};

	return (
		<div className="modal fade" id="newBusinessModal" tabIndex="-1" aria-labelledby="newBusinessModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="newBusinessModalLabel">
							<i className="bi bi-building-plus"></i> Create New Business
						</h5>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="closeNewBusinessModal"></button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleNewBusinessSubmit}>
							<div className="form-group mb-3">
								<label htmlFor="business_name" className="form-label">Business's name</label>
								<input
									type="text"
									id="business_name"
									name="name"
									className="form-control"
									placeholder="Business's name"
									value={newBusiness.name}
									onChange={handleNewBusinessChange}
									required
								/>
							</div>

							<div className="form-group mb-3">
								<label htmlFor="business_tax_id" className="form-label">Tax ID</label>
								<input
									type="text"
									id="business_tax_id"
									name="tax_id"
									className="form-control"
									placeholder="Tax ID"
									value={newBusiness.tax_id}
									onChange={handleNewBusinessChange}
									required
								/>
							</div>

							<div className="form-group mb-3">
								<label htmlFor="business_postal_code" className="form-label">Postal Code</label>
								<input
									type="text"
									id="business_postal_code"
									name="postal_code"
									className="form-control"
									placeholder="Postal Code"
									value={newBusiness.postal_code}
									onChange={handleNewBusinessChange}
									required
								/>
							</div>

							{businessErrorMessage && (
								<div className="alert alert-danger" role="alert">
									{businessErrorMessage}
								</div>
							)}
							<div className="d-grid mt-4">
								<button type="submit" className="btn-submit">
									<i className="bi bi-building-plus"></i> Add Business
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};