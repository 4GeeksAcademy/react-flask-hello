import React, { useContext, useState } from 'react'
import SearchReview from '../component/SearchReview.js'
import { Context } from '../store/appContext.js'
import MenuReviews from '../component/MenuReviews.js'
import ReviewsDoubleModal from '../component/ReviewsDoubleModal.jsx'

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { store, actions } = useContext(Context)

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchReview handleSearch={handleSearch} />
      {/* {(store.user.username || store.user.is_admin) && <ReviewsDoubleModal />} */}
      <MenuReviews searchQuery={searchQuery} />
    </div>
  );
}

export default Reviews