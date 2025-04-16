import React, { useState } from "react";
import { ClientList } from "../../components/ClientsList/List";
import { SearchInput } from "../../components/SearchInput/SearchInput";


export const Clients = () => {
	const [search, setSearch] = useState("");

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	return (

		<div className="clients-container">

			<SearchInput
				value={search}
				onChange={handleSearchChange}
				placeholder="Buscar por nombre o DNI..."
			/>


			<ClientList search={search} />
		</div>

	);
};