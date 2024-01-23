import styled from "styled-components";
import { Box } from "../Layouts"
import { useState } from "react";

const BoxList = styled.div`
  height: 100%;
  display: flex;
  background-color:${(props) => props.$background || "#989898"} ;
  color:${(props) => props.$color || "white"} ;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.$shadow || "0 2px 8px rgba(0, 0, 0, 0.2)"};
  &:hover{
    background-color: ${(props) => props.$background || "#5c5c5c"};
    cursor: pointer
  }
`;

const FriendBox =(props)=>{
const { nickName,userId,x,y } = props;


// 사용할 구문에 예정
// const handleContainerClick = (event) => {
//   const { clientX, clientY } = event;
//   setBoxPosition({ x: clientX, y: clientY });
// };

  return(
    <>
      <Box $width="90px" $height="100px" $direction="column" $position="absolute" style={{ left: x, top: y }}>
        <BoxList $background="#333333" >김현빈{nickName} 님</BoxList>
        <BoxList>1:1 대화</BoxList>
        <BoxList>친구 요청</BoxList>
        <BoxList>차단 하기</BoxList>
      </Box>
    </>
  )
}

export default FriendBox;