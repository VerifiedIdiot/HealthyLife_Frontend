import styled from "styled-components";

export const MemberImg = styled.div`
  display: ${(props) => (props.isSender ? "none" : "flex")};
  height: ${(props) => props.$height || "80px"};
  width: ${(props) => props.$width || "80px"};
  margin: 0 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
`;

export const MemberInfo = styled.div`
  height: 80px;
  width: 60%;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  margin: 0 10px;
`;

export const ChatIndexBox = styled.div`
  height: 35px;
  width: 40px;
  position: absolute;
  right: 0;
  background-color: #fd6b6b;
  color: white;
  font-weight: bold;
  top: 10%;
  right: -15%;
  display: flex;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 15px;
`;

export const ChatInfoBox = styled.input`
  border: none;
  width: 100%;
  outline: none;
  &:focus {
    border: none;
  }
`;

export const ChatImage = styled.img.attrs({
  className: "chat-img",
})`
  cursor: pointer;
  object-fit: cover;
  border-radius: 10px;
  margin: 5px;
  width: 100%;
  height: 100%;
`;

export const ChatContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 10px auto;
  border: 1px solid black;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const ChatHeader = styled.div`
  font-size: 1.3em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

export const Message = styled.div`
  padding: 5px;
  border-radius: 8px;
  overflow-wrap: break-word;
  min-height: 30px;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => (props.isSender ? "#c6d1f8" : "#E0E0E0")};
`;

export const MassegeState = styled.div`
  display: flex;
  color: grey;
  font-size: 0.6em;
  flex-direction: row;
  white-space: nowrap;
  justify-content: flex-end; /* 가로 방향으로 오른쪽 정렬 */
  align-items: flex-end; /* 세로 방향으로 아래쪽 정렬 */
`;

export const MassegeInput = styled.textarea`
  padding: 10px;
  position: relative;
  height: 20%;
  resize: none;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  width: 100px;
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: #4caf50;
  box-shadow: 1px 1px 1px #ccc;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const CloseButton = styled.button`
  padding: 2px 5px;
  border: none;
  background-color: #d14339;
  color: white;
  border-radius: 2px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const ChatBox = styled.div`
  display: flex;
  height: auto;
  flex-direction: ${(props) => (props.isSender ? "row-reverse" : "row")};
`;

export const ChatBox1 = styled.div`
  display: flex;
  width: ${(props) => (props.isSender ? "97%" : "70%")};
  flex-direction: row;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

export const MessegeContainer = styled.div`
  display: flex;
  width: 100%;
  & + & {
    margin-bottom: 5px;
  }
`;

export const SenderBox = styled.div`
  display: ${(props) => (props.isSender ? "none" : "box")};
`;
