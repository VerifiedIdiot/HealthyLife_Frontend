import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 75%;
  border: 1px solid black;
`;

const NavLink = styled.div`
  cursor: pointer;

`;

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavLink onClick={() => navigate('/about')}>About</NavLink>
      <NavLink onClick={() => navigate('/inbody')}>Inbody</NavLink>
      <NavLink onClick={() => navigate('/calendar')}>Calendar</NavLink>
      <NavLink onClick={() => navigate('/community')}>Community</NavLink>
      <NavLink onClick={() => navigate('/ranking')}>Ranking</NavLink>
      {/* 추가 링크 */}
    </NavContainer>
  );
};

export default Navigation;