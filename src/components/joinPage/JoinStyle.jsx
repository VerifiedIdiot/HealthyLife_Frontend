import styled from "styled-components";

export const LabelComp = styled.section`
  label {
    padding: 10px 20px;
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
