import styled from "styled-components";



export const MemberImg = styled.div`
  height: 80px;
  width: 80px;
  margin-left:15px;
  border-radius: 10px;
  border: 1px solid black;
`;

export const MemberInfo = styled.div`
  height: 80px;
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 15px;
`;

export const ChatImage = styled.img.attrs({
  className: "chat-img"
})`
  cursor: pointer;
  object-fit:cover;
`;


