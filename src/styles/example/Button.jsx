import { styled } from "styled-components";

const ButtonComp = styled.button`
  text-align: center;
  width: ${(props) => props.width || "200px"};
  height: ${(props) => props.height || "40px"};
  color: ${(props) => props.color || "white"};
  font-weight: 600;
  font-size: ${(props) => props.fontSize || "1em"};
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.$front || "var(--LIGHTVIO)"};
  transition: 0.4s ease-in;
  cursor: pointer;
  &.false {
    background-color: var(--GREY);
    cursor: default;
    &:hover {
      background-color: var(--GREY);
    }
  }
  &:hover {
    background-color: ${(props) => props.$back || "var(--VIOLET)"};
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