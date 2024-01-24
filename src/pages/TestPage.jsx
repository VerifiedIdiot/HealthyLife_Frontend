import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import LargeModal from "../styles/modals/LargeModal";
import MiddleModal from "../styles/modals/MiddleModal";
import SmallModal from "../styles/modals/SmallModal";
import React, { useState } from "react";
const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    Large: false,
    Middle: false,
    Small: false,
  });

  const openModal = (size) => {
    setIsModalOpen({ ...isModalOpen, [size]: true });
  };

  const closeModal = (size) => {
    setIsModalOpen({ ...isModalOpen, [size]: false });
  };
  return (
    <>
      <Main>
        <Container $border="1px solid black">
          <button onClick={() => openModal('Large')}>Large Modal</button>
          <button onClick={() => openModal('Middle')}>Medium Modal</button>
          <button onClick={() => openModal('Small')}>Small Modal</button>

          {isModalOpen.Large ? (
            <LargeModal
              $isOpen={isModalOpen.Large}
              $onClose={() => closeModal('Large')}
            />
          ) : isModalOpen.Middle ? (
            <MiddleModal
              $isOpen={isModalOpen.Middle}
              $onClose={() => closeModal('Middle')}
            />
          ) : isModalOpen.Small ? (
            <SmallModal
              $isOpen={isModalOpen.Small}
              $onClose={() => closeModal('Small')}
            />
          ) : null}
        </Container>
      </Main>
    </>
  );
};
export default TestPage;
