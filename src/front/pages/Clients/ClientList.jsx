import React, { useState } from "react";
import { ClientesList } from "../../components/ClientsList/List";
import { SearchInput } from "../../components/Search";

export const ClientList = () => {
	const [search, setSearch] = useState("");

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	return (

		<div className="client-list-page">
			<div className="search-container">
				<SearchInput
					value={search}
					onChange={handleSearchChange}
					placeholder="Buscar por nombre o DNI..."
				/>
			</div>

			<ClientesList search={search} />
		</div>

	);
};