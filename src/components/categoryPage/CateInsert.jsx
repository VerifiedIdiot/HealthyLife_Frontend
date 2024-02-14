import { useCallback, useState } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";

const CateInsertForm = styled.form`
  display: flex;
  background: #495057;
`;
const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  flex: 1; // 비율에 따라 남는 공간을 가져감
  &::placeholder {
    color: #dee2e6;
  }
`;
const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  background: #868e96;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s all ease-in;
  &:hover {
    background: #2446da;
  }
`;

const CateInsert = ({ onInsert, maxCategories }) => {
  const [value, setValue] = useState("");

  const onchange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value) {
        alert("카테고리를 입력해주세요.");
        return;
      }
      // 최대 입력 가능한 카테고리 수에 도달했는지 확인
      if (maxCategories && onInsert && onInsert.length >= maxCategories) {
        alert(`최대 ${maxCategories}개까지만 추가할 수 있습니다.`);
        return;
      }
      onInsert(value);
      setValue("");
      // submit 이벤트는 브라우저에서 새로고침을 발생시킵니다. 이를 방지하기 위한 처리

      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <CateInsertForm onSubmit={onSubmit}>
      <Input
        placeholder="게시글 카테고리 입력"
        value={value}
        onChange={onchange}
      />
      <Button type="submit">
        <MdAdd />
      </Button>
    </CateInsertForm>
  );
};
export default CateInsert;
