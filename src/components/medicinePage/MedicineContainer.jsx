import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useSearch } from "../../contexts/SearchContext";
import { useApiRequestParams } from "../../hooks/useApiRequest";
import MedicineApi from "../../api/MedicineApi";

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
  width: 54%;
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
  const searchTypes = ["통합", "제조사", "제품명"];
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    // console.log(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    // console.log(searchQuery);
  };

  return (
    <>
      <ComboSearchContainer>
        <ComboSelectBox value={searchType} onChange={handleSearchTypeChange}>
          {searchTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </ComboSelectBox>
        <ComboInputField
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </ComboSearchContainer>
    </>
  );
};

// SearchBox 영역
const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  /* @media (max-width: 768px) {
    
    width: 100%;
  } */
`;

const SearchInputField = styled.input`
  width: 75%;
  height: 40px;

  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 60vw;
    margin-left: 5px;
  }
`;

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    // console.log(searchQuery);
  };

  return (
    <SearchContainer>
      <SearchInputField
        type="text"
        placeholder="원료를 입력해주세요."
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    </SearchContainer>
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
`;

const DropdownContent = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  flex-wrap: wrap;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
`;

const CheckboxLabel = styled.label`
  flex-basis: calc(33.3% - 10px); // 3개씩 배열되도록 너비 계산, 여백 고려
  margin: 5px; // 여백 추가
  display: flex;
  align-items: center;
  box-sizing: border-box;
  white-space: nowrap; // 줄바꿈 방지
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #11009e; // 초기화 버튼 색상 변경
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

export const ComboBox = ({ comboBoxId, typeList, toggleComboBox }) => {
  const { state, actions } = useSearch();
  const { checkBoxStates } = state;

  const $isOpen = state.openComboBox === comboBoxId;

  // 체크박스 변경 핸들러
  const handleChange = (functionality) => {
    // functionality 값으로 체크 상태 결정
    const isChecked = !!checkBoxStates[comboBoxId]?.[functionality];
    actions.handleCheckboxChange(comboBoxId, functionality, !isChecked);
    // console.log(`콤보박스 아이디 : ${comboBoxId} 콤보박스 아이디 : ${functionality} isChecked : ${comboBoxId}`)

    const selectedCheckboxes = checkBoxStates[comboBoxId];

    if (selectedCheckboxes) {
      const selectedFunctionalityList = Object.keys(selectedCheckboxes).filter(
        (functionality) => selectedCheckboxes[functionality]
      );

      console.log("선택한 체크박스 목록:", selectedFunctionalityList);
    } else {
      console.log("아직 아무 체크박스도 선택되지 않았습니다.");
    }
  };

  return (
    <SelectBox>
      <DropdownItem onClick={() => toggleComboBox(comboBoxId)}>
        {/* 체크된 항목 수 계산 */}
        {
          Object.keys(checkBoxStates[comboBoxId] || {}).filter(
            (key) => checkBoxStates[comboBoxId][key]
          ).length
        }
        개 <span>▼</span>
      </DropdownItem>
      <DropdownContent $isOpen={$isOpen}>
        {typeList.map((item) => (
          <CheckboxLabel key={item.functionality}>
            <input
              type="checkbox"
              checked={!!checkBoxStates[comboBoxId]?.[item.functionality]}
              onChange={() => handleChange(item.functionality)}
            />{" "}
            {item.functionality}
          </CheckboxLabel>
        ))}
      </DropdownContent>
    </SelectBox>
  );
};

export const FilterDropdown = () => {
  const searchTypes = ["10개씩", "30개씩", "50개씩", "100개씩"];
  const [searchType, setSearchType] = useState(searchTypes[0]);

  // 숫자만 추출하는 함수
  const extractNumber = (string) => {
    const matches = string.match(/\d+/);
    return matches ? parseInt(matches[0], 10) : null;
  };

  // API 요청을 위한 함수

  const { data, loading, error } = useApiRequestParams(
    MedicineApi.getSortByOffSet,
    extractNumber(searchType)
  );

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <ComboSelectBox value={searchType} onChange={handleSearchTypeChange}>
        {searchTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </ComboSelectBox>
    </>
  );
};
