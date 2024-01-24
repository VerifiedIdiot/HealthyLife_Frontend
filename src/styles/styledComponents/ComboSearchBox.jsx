import React, { useState } from 'react';
import styled from 'styled-components';
import { MiddleButton } from './StyledComponents';


const SearchContainer = styled.div.attrs({
  className: "search-container",
})`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  width: ${(props) => props.$width || "100%"};
`;

const SelectBox = styled.select.attrs({
  className: "combo-box",
})`

  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${(props) => props.$width || "20%"};

  @media (max-width: 768px) {
   
   #a {width: 30%; }
    #b {width: 33.9%}
  }
`;

const InputField = styled.input.attrs({
  className: "input-field",
})`
  width: 100%;
  height: 18px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;



// SearchSection Component
export const ComboSearchBox = () => {
  const searchTypes = ['통합', '제조사', '제품명'];
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // console.log(`검색 유형: ${searchType}, 검색어: ${searchQuery}`);
    // // 여기에 검색 로직을 구현합니다.
  };

  return (
    <SearchContainer $width="76.5%">
      <SelectBox value={searchType} onChange={handleSearchTypeChange}>
        {searchTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </SelectBox>
      <InputField 
        type="text" 
        placeholder="검색어를 입력하세요." 
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {/* <MiddleButton onClick={handleSearch}>검색</MiddleButton> */}
    </SearchContainer>
  );
};



export const SearchBox = () => {
  // const searchTypes = ['통합', '제조사', '제품명'];
  // const [searchType, setSearchType] = useState(searchTypes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // const handleSearchTypeChange = (e) => {
  //   setSearchType(e.target.value);
  // };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // console.log(`검색 유형: ${searchType}, 검색어: ${searchQuery}`);
    // // 여기에 검색 로직을 구현합니다.
  };

  return (
    <SearchContainer $width="100%" $padding="0">
      {/* <SelectBox value={searchType} onChange={handleSearchTypeChange}>
        {searchTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </SelectBox> */}
      <InputField 
        type="text" 
        placeholder="원료를 입력해주세요." 
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {/* <MiddleButton onClick={handleSearch}>검색</MiddleButton> */}
    </SearchContainer>
  );
};

export const ComboBox = ({ items }) => {
  // 선택된 카테고리의 key 값을 저장
  const [selectedKey, setSelectedKey] = useState(items?.[0]?.key || "");
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

  const handleSelectionChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const handleReset = () => {
    setSelectedItems(new Set());
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // 현재 선택된 카테고리의 이름 찾기
  const selectedCategoryName = itemList.find(item => item.key === selectedKey)?.name || "";

  return (
    <SelectBox $width="33.9%">
      <div onClick={toggleDropdown}>
        {selectedCategoryName}: {selectedItems.size} <span>▼</span>
      </div>
      {showDropdown && (
        <div>
          {itemList.map((item) => (
            <label key={item.key}>
              <input
                type="checkbox"
                checked={selectedItems.has(item.key)}
                onChange={() => handleCheckboxChange(item.key)}
              />
              {item.name}
            </label>
          ))}
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </SelectBox>
  );
};
