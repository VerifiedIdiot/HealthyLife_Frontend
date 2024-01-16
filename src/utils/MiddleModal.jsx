import React from 'react';
import styled from 'styled-components';


const ModalOverlay = styled.div`
  
`;

const ModalContent = styled.div`

`;

const InfoModal = ({ isOpen, onClose, children }) => {
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default InfoModal;
