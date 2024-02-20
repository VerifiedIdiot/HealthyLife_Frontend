import { createContext, useContext, useState } from "react";

// 콘텍스트 생성
const ModalContext = createContext();

// 콘텍스트 프로바이더 컴포넌트 생성
export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// 콘텍스트 사용을 위한 훅 생성(커스텀훅)
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
