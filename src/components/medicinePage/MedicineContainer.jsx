import styled from "styled-components";
import { useSearch } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";

// ComboSearchBox 컴포넌트
const ComboSearchContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  @media (max-width: 768px) {
    width: 78vw;
  }

  @media (max-width: 500px) {
  }
`;

const ComboSelectBox = styled.select`
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 21%;

  @media (max-width: 768px) {
    width: 30%;
  }

  @media (max-width: 500px) {
  }
`;

const ComboInputField = styled.input`
  width: 100%;
  height: 40px;

  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

export const ComboSearchBox = () => {
  const { state, actions } = useSearch();
  const searchTypes = ["통합", "제품명", "제조사", "신고번호"];
  const navigate = useNavigate();

  // 검색 유형과 쿼리 변경 핸들러
  const handleSearchTypeChange = useCallback(
    (e) => {
      const newSearchType = e.target.value;
      actions.setSearchType(newSearchType);

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("searchType", newSearchType);
      navigate(`?${searchParams.toString()}`, { replace: true });
    },
    [actions, navigate]
  );

  const handleSearchQueryChange = (e) => {
    actions.setSearchQuery(e.target.value);
  };

  return (
    <ComboSearchContainer>
      <ComboSelectBox
        value={state.searchType}
        onChange={handleSearchTypeChange}>
        {searchTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </ComboSelectBox>
      <ComboInputField
        type="text"
        placeholder="검색어를 입력하세요."
        // value={state.searchQuery}
        onChange={handleSearchQueryChange}
      />
    </ComboSearchContainer>
  );
};

// ComboBox 컴포넌트

const SelectBox = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  &:hover {
    background-color: #f0f0f0;
  }
  h3 {
    display: flex;
    margin-right: 5px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: .9rem;
      
      white-space: normal;
    }
    h4 {
      font-size: .9rem;
      white-space: nowrap;
      
    }
  }

  @media (max-width: 500px) {
  }
`;


const DropdownContent = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-wrap: wrap;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  width: auto; // 자동으로 내용물에 맞춰 조정
  min-width: calc(99% * 3); // 콤보박스 3개의 너비 합계로 최대 너비 설정 (가정)
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;

  ${({ $position }) =>
    $position === "right" &&
    `
    right: 50%;
    transform: translateX(-67%);
  `}

  ${({ $position }) =>
    $position === "middle" &&
    `
    left: 50%;
    transform: translateX(-50%);
  `}

@media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const CheckboxLabel = styled.label`
  flex: 0 1 calc(33.33% - 20px); // 한 줄에 3개씩, 항목 사이 간격 고려
  margin: 10px; // 항목 사이의 간격
  display: flex;
  align-items: center; // 체크박스와 레이블을 세로 중앙 정렬
  white-space: nowrap; // 줄바꿈 방지

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const ResetButton = styled.button`
  position: absolute;
  width: 80px;
  padding: 10px;
  right: 10px;
  background-color: #4942e4; // 초기화 버튼 색상 변경
  color: white;
  border: none;
  transition: 0.2s ease-in;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #11009e;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

export const ComboBox = ({ comboBoxId, $position }) => {
  const { state, actions } = useSearch();
  const { checkBoxStates, typeList } = state;
  const { toggleComboBox } = actions;
  const $isOpen = state.openComboBox === comboBoxId;

  // 체크박스 변경 핸들러
  const handleChange = useCallback(
    (functionality) => {
      const isChecked = !!checkBoxStates[comboBoxId]?.[functionality];
      actions.handleCheckboxChange(comboBoxId, functionality, !isChecked);
    },
    [checkBoxStates, comboBoxId, actions.handleCheckboxChange]
  );

  const handleReset = useCallback(() => {
    actions.resetComboBox(comboBoxId);
  }, [actions, comboBoxId]);

  const checkedItemsCount = useMemo(() => {
    return Object.keys(checkBoxStates[comboBoxId] || {}).filter(
      (key) => checkBoxStates[comboBoxId][key]
    ).length;
  }, [checkBoxStates, comboBoxId]);

  return (
    <SelectBox>
      <DropdownItem onClick={() => toggleComboBox(comboBoxId)}>
        <h3>{comboBoxId}</h3>
        <h4> {checkedItemsCount}개 ▼</h4>
      </DropdownItem>

      <DropdownContent $isOpen={$isOpen} $position={$position}>
        {typeList[comboBoxId]?.map((item) => (
          <CheckboxLabel key={item.functionality}>
            <input
              type="checkbox"
              checked={!!checkBoxStates[comboBoxId]?.[item.functionality]}
              onChange={() => handleChange(item.functionality)}
            />{" "}
            {item.functionality}
          </CheckboxLabel>
        ))}
        <ResetButton onClick={handleReset}>초기화</ResetButton>
      </DropdownContent>
    </SelectBox>
  );
};

const Option = styled.option`
  /* padding: 5px; */
  width: 300px;
  background-color: white; // 선택되지 않은 옵션의 배경색
  &:checked {
    background-color: lightgray; // 선택된 옵션의 배경색, 일부 브라우저에서는 작동하지 않을 수 있음
  }
`;

export const FilterDropdown = () => {
  const { state, actions } = useSearch();
  const navigate = useNavigate(); // useNavigate 훅 추가

  const searchTypes = ["10", "30", "50", "100"];

  const handleSize = useCallback(
    (e) => {
      const newSize = e.target.value;
      actions.setSize(newSize);

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("size", newSize);
      navigate(`?${searchParams.toString()}`, { replace: true });
    },
    [actions, navigate]
  );

  return (
    <ComboSelectBox value={state.size} onChange={handleSize}>
      {searchTypes.map((type) => (
        <Option key={type} value={type}>
          {type}개씩
        </Option>
      ))}
    </ComboSelectBox>
  );
};
