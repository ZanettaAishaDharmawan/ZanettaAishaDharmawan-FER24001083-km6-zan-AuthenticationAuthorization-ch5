import React from "react";
import "./Modal.css"; // CSS file for styling modal

function Modal(props) {
  const { isOpen, onClose, children } = props;

  // If modal is not open, return null (modal will not be rendered)
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
