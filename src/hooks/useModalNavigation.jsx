import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useModalNavigation = (isUnauthorized) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (isUnauthorized) {
      setShowModal(true);
    } else {
      navigate(path);
    }
  };
  
  const handleModalConfirmation = () => {
    setShowModal(false);
    navigate('/login'); // 로그인 경로에 맞게 수정하세요
  };

  return { showModal, handleNavigation, handleModalConfirmation };
};

export default useModalNavigation;
