import React from 'react';
import '../styles/modal.css';

function Modal({ isOpen, onClose, title, description }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
