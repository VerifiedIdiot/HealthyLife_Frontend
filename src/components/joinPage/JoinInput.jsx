import { styled } from "styled-components";
import Button from "../../styles/example/Button";
const InputButtonComp = styled.div`
  width: 100%;
  position: relative;
  .inputWrap {
    border-bottom: 1px solid black;
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
      width: 100%;
      outline: none;
      border: none;
      padding: 10px 10px;
    }
  }
  .msg {
    position: absolute;
    padding-top: 5px;
    padding-left: 2px;
    letter-spacing: 0.8px;
    word-break: keep-all;
    font-size: 0.8em;
    font-weight: 600;
    &.fail {
      color: red;
    }
  }
`;

export const InputButton = (props) => {
  const {
    value,
    holder,
    changeEvt,
    type,
    btnChild,
    active,
    clickEvt,
    msg,
    msgType,
    disabled,
    readOnly,
  } = props;

  return (
    <InputButtonComp>
      <div className="inputWrap">
        <input
          type={type ? type : "text"}
          defaultValue={value}
          placeholder={holder}
          onChange={(e) => changeEvt(e)}
          disabled={disabled}
          readOnly={readOnly}
        />
        <Button
          children={btnChild}
          active={active}
          clickEvt={clickEvt}
          width="8%"
          height="30px"
          fontSize="14px"
        />
      </div>
      <div className={`msg ${msgType ? "" : "fail"}`}>{msg}</div>
    </InputButtonComp>
  );
};

const InputComp = styled.div`
  width: 100%;
  position: relative;
  padding: "10px 10px";
  input {
    width: 100%;
    height: auto;
    padding: 10px;
    border: none;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    outline: none;
    /* font-size: 1em; */
    &:disabled {
      opacity: 1;
      background-color: white;
    }
  }
  .msg {
    position: absolute;
    padding-top: 5px;
    padding-left: 2px;
    letter-spacing: 0.8px;
    word-break: keep-all;
    font-size: 0.8em;
    font-weight: 600;
    &.fail {
      color: red;
    }
  }
`;
export const Input = (props) => {
  const { value, holder, changeEvt, type, msg, msgType, disabled, readOnly } =
    props;
  return (
    <InputComp>
      <input
        type={type ? type : "text"}
        value={value}
        placeholder={holder}
        onChange={(e) => changeEvt(e)}
        disabled={disabled}
        readOnly={readOnly}
      />
      <div className={`msg ${msgType ? "" : "fail"}`}>{msg}</div>
    </InputComp>
  );
};

export const Address = (props) => {
  const { value, open } = props;
  return (
    <InputComp>
      <input
        type="text"
        placeholder="주소찾기"
        defaultValue={value}
        readOnly={true}
        onClick={open}
      />
    </InputComp>
  );
};
