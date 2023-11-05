import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext.js'
import SearchReview from '../component/SearchReview.js'
import OffersDoubleModal from '../component/OffersDoubleModal.jsx'
import MenuOffers from '../component/MenuOffers.jsx'

const Business_offers = () => {
  const { store, actions } = useContext(Context)
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <SearchReview handleSearch={handleSearch} />
      {(store.business_user.business_name || store.user.is_admin) && <OffersDoubleModal /> }
      <MenuOffers searchQuery={searchQuery} />
    </>


  )
}

export default Business_offers