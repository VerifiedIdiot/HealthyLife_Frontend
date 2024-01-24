import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

const ModalOverlay = styled.div`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  width: ${(props) => props.$width || "20vw"};
  height: ${(props) => props.$height || "30vh"};
  
  z-index: 99999;
`;





const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  /* @media (max-width: 768px) {
    
    top: 1px;
    right: 1px;
    
  } */
`;

const SmallModal = ({ $isOpen, $onClose, imageSrc, children }) => {
  // esc 누르면 모달창 종료
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        $onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [$onClose]);

  return (
    <>
      <ModalOverlay $isOpen={$isOpen} onClick={$onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={$onClose}>&times;</CloseButton>
          {/* <ImageSection src={imageSrc} /> */}
          {/* <ContentSection>{children}</ContentSection> */}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default SmallModal;