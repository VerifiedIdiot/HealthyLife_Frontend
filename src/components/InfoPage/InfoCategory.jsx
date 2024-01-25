import React, { useState, useCallback } from "react";
import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../../styles/Layouts";
import styled, { css } from "styled-components";

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  height: 40px;
  border-radius: 50px;
  border: 2px solid #909090;
  cursor: pointer;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
`;

const Circle = styled.div`
  background-color: #4942e4;
  width: 200px;
  height: 30px;
  border-radius: 50px;
  position: absolute;
  left: 1%;
  transition: all 0.8s ease;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(188px, 0);
      transition: all 0.5s ease;
    `}
`;

const BtnText = styled.div`
  display: inline;
  position: absolute;
  z-index: 10;
  left: ${(props) => (!props.Text ? "72px" : "267px")};
  display: inline;
  color: ${(props) => (!props.toggle ? "gray" : "white")};
  font-size: 15px;
  font-weight: bold;
  transition: all 0.5s ease;
`;

const InfoCategory = ({ setdata }) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    // setToggle은 비동기적으로 실행되기 때문에 완료 후에 값을 사용할 수 있는 콜백 함수 전달
    setToggle((prev) => {
      const newToggle = !prev;
      // 자식 컴포넌트에서 콜백 함수 호출
      setdata(newToggle);
      return newToggle;
    });
  };

  return (
    <Main $justify="center" $align="center">
      <ToggleBtn onClick={handleClick} toggle={toggle}>
        <BtnText toggle={!toggle}>음식 정보</BtnText>
        <BtnText Text={true} toggle={toggle}>
          운동 정보
        </BtnText>
        <Circle toggle={toggle} />
      </ToggleBtn>
    </Main>
  );
};

export default InfoCategory;
