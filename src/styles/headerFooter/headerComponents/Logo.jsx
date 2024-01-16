import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LogoContainer = styled.div.attrs({
  className: "logo"
})`
  height: 100%;
  width: 25%;
  border: 1px solid black;
  cursor: pointer;
  
`;

const Logo = () => {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate('/')}>
      {/* 로고 이미지 또는 텍스트 */}
    </LogoContainer>
  );
};

export default Logo;