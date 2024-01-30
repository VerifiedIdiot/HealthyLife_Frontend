import { styled } from "styled-components";

export const ButtonComp = styled.button`
  text-align: center;
  width: ${(props) => props.$width || "40px"};
  height: ${(props) => props.$height || "25px"};
  color: ${(props) => props.$color || "white"};
  font-weight: 600;
  font-size: ${(props) => props.$fontSize || "1em"};
  border: ${(props) => props.$border || "none"};
  border-radius: ${(props) => props.$borderRadius || "8px"};
  background-color: ${(props) => props.$front || "#4942E4"};
  transition: 0.2s ease-in;
  cursor: pointer;
  &.false {
    background-color: #4942e4;
    cursor: default;
    &:hover {
      background-color: #11009e;
    }
  }
  &:hover {
    background-color: ${(props) => props.$back || "#11009E"};
    color: white;
  }
`;

// 활성/비활성 버튼
const Button = (props) => {
  const {
    children,
    width,
    height,
    fontSize,
    active,
    clickEvt,
    front,
    back,
    color,
  } = props;
  return (
    <>
      <ButtonComp
        color={color}
        $front={front}
        $back={back}
        width={width}
        height={height}
        fontSize={fontSize}
        className={active ? "" : "false"}
        onClick={() => {
          if (active) clickEvt();
        }}
      >
        {children}
      </ButtonComp>
    </>
  );
};
export default Button;
