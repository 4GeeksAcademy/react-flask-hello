import React, { useState } from "react";
import { ClientesList } from "../components/Lista.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { SearchInput } from "../components/SearchInput/SearchInput.jsx";

export const ClientList = () => {
	const [search, setSearch] = useState("");

	const handleSearchChange = (e) => {
		setSearch(e.target.value)
	};

	return (
		<ScrollToTop>
			<div style={{ backgroundColor: "#CAD2C5", minHeight: "100vh" }}>


				<SearchInput
					value={search}
					onChange={handleSearchChange}
					placeholder="Buscar por nombre o DNI..."
				/>


				<ClientesList search={search} />
			</div>
		</ScrollToTop>
	);
};