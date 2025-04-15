import React, { useState } from "react";
import { SelectBusiness } from "../../components/SelectBusiness/SelectBusiness";
import { SearchInput } from "../../components/SearchInput/SearchInput";

export const Business = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  };

  return (
    <>
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        placeholder="Search company name..."
      />

      <SelectBusiness  searchTerm = {search}/>
    </>
  );
};
