import React from "react";


const UnauthorizedModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <p>접근 권한이 없습니다.</p>
        <button onClick={onClose}>닫기</button>
      </div>
    );
  };
  
  export default UnauthorizedModal;
  