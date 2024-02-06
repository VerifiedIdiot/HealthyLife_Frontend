import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useSearch } from "../../contexts/SearchContext";


// ComboSearchBox 컴포넌트
const ComboSearchContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ComboSelectBox = styled.select`
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 21%;

  @media (max-width: 768px) {
    width: 110px;
  }
`;

const ComboInputField = styled.input`
  width: 100%;
  height: 40px;

  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 60vw;
    margin-left: 5px;
  }
`;

export const ComboSearchBox = () => {
  const { state, actions } = useSearch();
  
  const searchTypes = ["통합", "제품명", "제조사", "신고 번호"];

  // 검색 유형과 쿼리 변경 핸들러
  const handleSearchTypeChange = (e) => {
    actions.setSearchType(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    actions.setSearchQuery(e.target.value);
  };

  return (
    <ComboSearchContainer>
      <ComboSelectBox value={state.searchType} onChange={handleSearchTypeChange}>
        {searchTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </ComboSelectBox>
      <ComboInputField
        type="text"
        placeholder="검색어를 입력하세요."
        value={state.searchQuery}
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
    width: 19.5vw;
    margin-left: 0.5vw;
  }
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  &:hover {
    background-color: #f0f0f0;
  }
  h3 {
    display: flex;

    white-space: nowrap;
  }
`;

const DropdownItemName = styled.div`
  position: absolute;
  right: 40%;
  white-space: nowrap;
  h3 {
    font-size: 1rem;
    
  }
`

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

  ${({ $position }) => $position === 'right' && `
    right: 50%;
    transform: translateX(-67%);
  `}

  ${({ $position }) => $position === 'middle' && `
    left: 50%;
    transform: translateX(-50%);
  `}
`;

const CheckboxLabel = styled.label`
  flex: 0 1 calc(33.33% - 20px); // 한 줄에 3개씩, 항목 사이 간격 고려
  margin: 10px; // 항목 사이의 간격
  display: flex;
  align-items: center; // 체크박스와 레이블을 세로 중앙 정렬
  white-space: nowrap; // 줄바꿈 방지
`;

const ResetButton = styled.button`
  position: absolute;
  width: 80px;
  padding: 10px;
  right: 10px;
  background-color: #4942E4; // 초기화 버튼 색상 변경
  color: white;
  border: none;
  transition: 0.2s ease-in;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
      background-color: #11009e;
    }
`;

export const ComboBox = ({ comboBoxId, $position }) => {
  const { state, actions } = useSearch();
  const { checkBoxStates, typeList } = state;
  const { toggleComboBox } = actions;
  const $isOpen = state.openComboBox === comboBoxId;

  // 체크박스 변경 핸들러
  const handleChange = (functionality) => {
    // functionality 값으로 체크 상태 결정
    const isChecked = !!checkBoxStates[comboBoxId]?.[functionality];
    actions.handleCheckboxChange(comboBoxId, functionality, !isChecked);
    
  };

  const handleReset = () => {
    actions.resetComboBox(comboBoxId);
  };
  return (
    <SelectBox>
      <DropdownItem onClick={() => toggleComboBox(comboBoxId)}>
      <DropdownItemName><h3>{comboBoxId}</h3></DropdownItemName>
        {
          Object.keys(checkBoxStates[comboBoxId] || {}).filter(
            (key) => checkBoxStates[comboBoxId][key]
          ).length
        }
        개 <span>▼</span>
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

export const FilterDropdown = () => {
  const { state, actions } = useSearch();
  const searchTypes = ["10개씩", "30개씩", "50개씩", "100개씩"];

 
 
  const handleSearchTypeChange = async (e) => {
    const newSize = extractNumber(e.target.value);
    actions.setPageSize(newSize); 
    actions.performSearch(); 
  };

  // 숫자만 추출하는 함수
  const extractNumber = (string) => {
    const matches = string.match(/\d+/);
    return matches ? parseInt(matches[0], 10) : null;
  };

  return (
    <ComboSelectBox value={`${state.size}개씩`} onChange={handleSearchTypeChange}>
      {searchTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </ComboSelectBox>
  );
};
