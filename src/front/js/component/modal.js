import React from "react";
import 'react-responsive-modal/styles.css';
import PropTypes from "prop-types";
import { Modal } from 'react-responsive-modal';

function ModalComponent(props) {

  return (
    <>
      <div>
        <Modal open={props.open} onClose={props.onCloseModal} center >
          <div className="content">
            <div className="header">
              <h5 className="title" >
                {props.data.name}
              </h5>
             
            </div>
            <div className="body">{props.data.description}</div>
            <div className="footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#fbb" + 442 }}
                onClick={props.onOpenModal}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
export default Modal;
Modal.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};