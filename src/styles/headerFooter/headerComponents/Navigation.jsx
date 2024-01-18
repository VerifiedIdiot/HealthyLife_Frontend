import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useRequireAuth from '../../../hooks/useRequireAuth';


const NavContainer = styled.nav.attrs({
  className: "nav-bar"
})`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 75%;
  /* border: 1px solid black; */
`;

const NavLink = styled.div.attrs({
  className: "nav-item"
})`
  cursor: pointer;

`;

const Navigation = () => {
  const { isUnauthorized } = useRequireAuth('USER');
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavLink onClick={() => navigate('/inbody')}>Inbody</NavLink>
      <NavLink onClick={() => navigate('/calendar')}>Calendar</NavLink>
      <NavLink onClick={() => navigate('/information')}>Information</NavLink>
      <NavLink onClick={() => navigate('/community')}>Community</NavLink>
      <NavLink onClick={() => navigate('/ranking')}>Ranking</NavLink>
      
    </NavContainer>
  );
};

export default Navigation;