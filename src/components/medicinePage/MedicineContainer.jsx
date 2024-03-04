import styled from "styled-components";
import Select from "react-select";
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

    &:focus {
    outline: none; /* 포커스 시 아웃라인 제거 */
  }

  @media (max-width: 768px) {
    width: 30%;
  }

  @media (max-width: 500px) {
  }
`;

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    height: '40px',
    borderRadius: '0 0 4px 4px',
    width: '120px', // 모든 화면 크기에서 너비를 100%로 유지
    border: '1px solid #ccc',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #aaa',
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    height: '40px',
    padding: '0 8px', // 적절한 패딩을 설정
  }),
  singleValue: (styles) => ({
    ...styles,
    margin: 0,
    lineHeight: '40px', // singleValue의 높이에 맞춰 line-height 조정
  }),
  option: (styles) => ({
    ...styles,
    whiteSpace: 'pre-wrap', // 옵션 텍스트가 잘리지 않도록 설정
    '&:first-child': {
      borderTopRightRadius: '0',
      borderTopLeftRadius: '0',
    },
    '&:last-child': {
      borderBottomRightRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%', // 드롭다운 메뉴의 너비를 컨트롤과 동일하게 설정
  }),
};


const ComboInputField = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

export const ComboSearchBox = () => {
  const { state, actions } = useSearch();
  const navigate = useNavigate();
  const searchTypes = ["통합", "제품명", "제조사", "신고번호"].map(type => ({ value: type, label: type }));

  const handleSearchTypeChange = (selectedOption) => {
    const newSearchType = selectedOption.value;
    actions.setSearchType(newSearchType);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("searchType", newSearchType);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleSearchQueryChange = (e) => {
    actions.setSearchQuery(e.target.value);
  };

  return (
    <ComboSearchContainer>
      <Select
        styles={customSelectStyles}
        options={searchTypes}
        value={searchTypes.find(option => option.value === state.searchType)}
        onChange={handleSearchTypeChange}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '',
            primary: '#4942e4', // 옵션 선택 배경색
          },
        })}
      />
      <ComboInputField
        type="text"
        placeholder="검색어를 입력하세요."
        value={state.searchQuery || ''}
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
    [checkBoxStates, comboBoxId, actions]
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

  &:focus {
    outline: none; /* 포커스 시 아웃라인 제거 */
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
