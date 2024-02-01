import styled from "styled-components";
import { useState } from "react";
import {useApiRequestParams} from "../../hooks/useApiRequest";
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
  width: 24.9%;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  cursor: pointer;
  position: relative;

  @media (max-width: 768px) {
    width: 19.5vw;
    margin-left: 0.5vw;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;

    &.show {
      display: block;
    }
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  margin: 5px 0;
`;

const ResetButton = styled.button`
  margin-top: 10px;
`;

export const ComboBox = ({ items }) => {
  // 드롭다운 표시 여부 상태
  const [showDropdown, setShowDropdown] = useState(false);
  // 체크된 항목들의 집합
  const [selectedItems, setSelectedItems] = useState(new Set());

  // `items`가 undefined 일 경우 대비하여 빈 배열로 초기화
  const itemList = items || [];

  const handleCheckboxChange = (itemKey) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (newSelectedItems.has(itemKey)) {
        newSelectedItems.delete(itemKey);
      } else {
        newSelectedItems.add(itemKey);
      }
      return newSelectedItems;
    });
  };

  const handleReset = () => {
    setSelectedItems(new Set());
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // 선택된 항목들의 수를 표시
  const selectedCount = selectedItems.size;

  return (
    <SelectBox>
      <div onClick={toggleDropdown}>
        {selectedCount} <span>▼</span>
      </div>
      <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
        {itemList.map((item) => (
          <CheckboxLabel key={item.key}>
            <input
              type="checkbox"
              checked={selectedItems.has(item.key)}
              onChange={() => handleCheckboxChange(item.key)}
            />
            {item.name}
          </CheckboxLabel>
        ))}
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </div>
    </SelectBox>



/* <div>
      {Object.entries(typeList).map(([key, items]) => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.functionality}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div> */
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
