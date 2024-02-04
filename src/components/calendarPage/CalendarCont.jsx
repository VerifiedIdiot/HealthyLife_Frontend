import styled from "styled-components";
import React, { useEffect, useState } from "react";
import MiddleModal from "../../styles/modals/MiddleModal";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import CalendarApi from "../../api/CalendarApi";

const InputField = styled.input`
  width: 30vw;
  height: 40px;

  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
  }
`;

const InputAddBtn = styled(MiddleButton)`
  margin: 10px;
`;

const SearchResultContainer = styled.div`
  height: auto;
  overflow-y: auto; // 높이 초과할 경우 스크롤바 생성
  p {
    margin: 0;
    padding: 3px;
  }
  @media (max-width: 768px) {
    height: auto;
  }
`;

// MealInput 컴포넌트
export const MealInutBox = ({ closeModal, mealType, onAddItem }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null);
  };

  const handleSearchResultClick = async (item) => {
    setSelectedItem({ meal_name : item.name, meal_type: mealType });
    setSearchQuery(item.name);
    console.log(item.name);
  };

  const handleAddClick = async () => {
    if (selectedItem) {
      try {
        const mealDto = selectedItem;
        const savedItem = await CalendarApi.addMeal(mealDto);
      console.log("savedItem:", savedItem);
        onAddItem(selectedItem);
        closeModal();
      } catch (e) {
        console.error("데이터 저장 중 오류 발생", e);
      }
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        try {
          const result = await CalendarApi.getFoodListBySearch({
            keyword: searchQuery,
          });
          setSearchResults(result);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <>
      <ComboBoxContainer>
        <ComboBoxSection>
          <ComboSelectBox $height="90%" $justify="flex-start">
            <InputField
              type="text"
              placeholder="메뉴를 입력하세요."
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </ComboSelectBox>
        </ComboBoxSection>

        {/* 검색 결과 표시 */}
        {searchQuery && (
          <SearchResultContainer>
            {searchResults.map((item, index) => (
              <div key={index} onClick={() => handleSearchResultClick(item)}>
                <p>{item.name}</p>
              </div>
            ))}
          </SearchResultContainer>
        )}

        <InputAddBtn onClick={handleAddClick}>추가하기</InputAddBtn>
      </ComboBoxContainer>
    </>
  );
};

// ComboBox 컴포넌트
const ComboBoxContainer = styled.div.attrs({
  className: "ComboBoxConstainer",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ComboBoxSection = styled.div.attrs({
  className: "ComboBoxSection",
})`
  max-height: 100%;
`;

const ComboSelectBox = styled.div.attrs({
  className: "SelectBox",
})`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: center;
  width: 100%;
  height: ${(props) => props.$height || "100%"};

  border-radius: 4px;

  @media (max-width: 768px) {
    width: 110px;
  }
`;

const ComboBox = styled.div`
display: flex;
flex-flow: row;
  justify-content: center;
  align-items: center;`;

const MealInput = styled.div`
  padding: 10px 0;
  border: none;
  background-color: transparent;
  font-size: 18px;
`;

const MealLabel = styled.span`
  font-size: 18px;
`;

const AddButton = styled.button`
  background: #fff;
  color: #4942e4;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

export const MealBox = () => {
  const MealTypes = ["아침", "점심", "저녁"];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");
  const [addedMeals, setAddedMeals] = useState({});

  const openModal = (mealType) => {
    setSelectedMealType(mealType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMealAdd = (meal) => {
    setAddedMeals({ ...addedMeals, [selectedMealType]: meal });
    closeModal();
  };

  return (
    <>
      <ComboBoxContainer>
        <ComboSelectBox>
          {MealTypes.map((mealType) => (
            <ComboBox key={mealType}>
              <MealLabel>{mealType}</MealLabel>
              <MealInput value={addedMeals[mealType]?.name || ""} readOnly />
              <AddButton onClick={() => openModal(mealType)}> + </AddButton>
            </ComboBox>
          ))}
        </ComboSelectBox>
      </ComboBoxContainer>
      <MiddleModal $isOpen={modalOpen} $onClose={closeModal}>
        <MealInutBox 
        closeModal={closeModal} 
        mealType={selectedMealType} 
        onAddItem={handleMealAdd}
        />
      </MiddleModal>
    </>
  );
};
