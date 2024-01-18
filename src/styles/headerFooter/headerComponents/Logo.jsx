import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg'

const LogoContainer = styled.div.attrs({
  className: "logo"
})`
  display: flex;
  padding-left: 3vw;
  padding-top: .1vw;
  align-items: center;
  height: 100%;
  width: 25%;
  /* border: 1px solid black; */
  cursor: pointer;
  
`;

const LogoImage = styled.img.attrs({
  className: "logo-img"
})`
  height: 100%;
  
  object-fit: contain;
`



const Logo = () => {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate('/')}>
      <LogoImage src={logo}/>
    </LogoContainer>
  );
};

export default Logo;