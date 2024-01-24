import styled from "styled-components";

const CheckboxComp = styled.div`
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    display: flex;
    align-items: center;
    &.agreeAll {
      font-size: 1.2em;
    }
    input {
      margin-right: 10px;
    }
  }
  .iconBox {
    padding: 5px 5px;
    cursor: pointer;
  }
`;

const AgreeCheck = ({
  checked,
  children,
  onCheckedChange,
  agreeAll,
  modalType,
}) => {
  const checkBoxChange = () => {
    // onCheckedChange("checked");
    onCheckedChange("");
  };
  return (
    <>
      <CheckboxComp>
        <label className={agreeAll ? "agreeAll" : ""}>
          <input type="checkbox" checked={checked} onChange={checkBoxChange} />
          {children}
        </label>
      </CheckboxComp>
    </>
  );
};
export default AgreeCheck;
