import React, { useState } from 'react';
import styled from 'styled-components';
import { MiddleButton } from './StyledComponents';
// Styled Components
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`;

const ComboBox = styled.select`
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = styled.input`
  width: 70%;
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
    <SearchContainer>
      <ComboBox value={searchType} onChange={handleSearchTypeChange}>
        {searchTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </ComboBox>
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
