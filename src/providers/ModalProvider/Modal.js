import React, { useContext } from "react";
import { Context } from "./ModalProvider";
import "./Modal.css";

const Modal = () => {
  const { executable, dismissed, question, modalShow } = useContext(Context);
  return modalShow ? (
    <div
      className="modal-container animated fadeIn fast"
      onClick={e => {
        if (e.target.classList.contains("modal-container")) {
          dismissed();
        }
      }}
    >
      <div className="modal-custom">
        <div className="animated zoomIn fastest animation-modalbox">
          <span className="modalQuestion">{question}</span>
          <div className="modal-btn">
            <button
              onClick={() => {
                executable();
                dismissed();
              }}
              className="yes-m-btn btn btn-small waves-effect waves-light darken-2 "
            >
              Yes
            </button>
            <button
              onClick={() => {
                dismissed();
              }}
              className="no-m-btn waves-effect red waves-light btn btn-small"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Modal;
