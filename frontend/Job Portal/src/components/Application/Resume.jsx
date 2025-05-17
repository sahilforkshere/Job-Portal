import React from 'react';

function Resume({ imageUrl, onClose }) {
  return (
    <div className="resume-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
}

export default Resume;

