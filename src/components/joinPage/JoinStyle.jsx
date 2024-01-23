import styled from "styled-components";

export const LabelComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  /* height: 80px; */

  label {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 5px;
    font-size: 0.8em;
    font-weight: 600;
    cursor: pointer;
    background-color: #4942e4;
    transition: 0.3s ease-out;
    &:hover {
      background-color: #11009e;
      color: white;
    }
  }
  input {
    display: none;
  }
`;
