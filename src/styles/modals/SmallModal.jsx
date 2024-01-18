import React from 'react';
import styled from 'styled-components';


const ModalOverlay = styled.div`
  
`;

const ModalContent = styled.div`

`;



const ConfirmationModal = ({ isOpen, onClose, message, onConfirm }) => {
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
