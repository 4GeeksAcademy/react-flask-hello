import React, { useContext } from "react";
import Card from "../component/reviewsLibros/Card";
import Testimonio from "../component/reviewsLibros/Testimonio";

const BookReviews = () => {
  return (
    <div className="row m-3 mt-4">
      <div className="col-md-6 d-flex justify-content-center text-center">
        <Card />
      </div>
      <div className="col-md-6 d-flex justify-content-start text-center">
        <div className="row pe-5">
          <Testimonio />
          <Testimonio />
          <Testimonio />
          <Testimonio />
        </div>
      </div>
    </div>
  );
};

export default BookReviews;
