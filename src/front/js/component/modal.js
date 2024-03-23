import React from "react";

export const Modal = () => (
  <div className="whole-wheat">
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>

    {/* <!-- Modal --> */}
    <div
      className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Congrats! You've met your goal!
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Please enjoy this Mock-tail to celebrate! Don't worry, weve already
            added it to your favorites! 🤭
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              See Recipe
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
