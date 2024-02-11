import styled from "styled-components";
import React, { useEffect, useState } from "react";
import MiddleModal from "../../styles/modals/MiddleModal";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import CalendarApi from "../../api/CalendarApi";
import {
  ComboBoxContainer,
  ComboBoxSection,
  ComboSelectBox,
  ComboBox,
  MealInput,
  MealLabel,
  AddButton,
  InputField,
  InputAddBtn,
  SearchResultContainer,
} from "./CalendarStyle";

export const MealInputBox = ({ closeModal, mealType, onAddItem }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null);
  };

  const handleSearchResultClick = async (item) => {
    setSelectedItem({ meal_name: item.name});
    setSearchQuery(item.name);
    // console.log("확인필요", mealType);
  };
  
  const handleAddClick = async (mealType) => {
    if (Object.keys(selectedItem).length > 0) {
      try {
        const mealName = selectedItem.meal_name;
        onAddItem(mealType, mealName);
        console.log(mealType);
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
          const result = await CalendarApi.getFoodList({
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
          <ComboSelectBox>
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
              <div key={index} onClick={() => handleSearchResultClick(item, mealType)}>
                <p>{item.name}</p>
              </div>
            ))}
          </SearchResultContainer>
        )}

        <InputAddBtn onClick={() =>handleAddClick(mealType)}>추가하기</InputAddBtn>
      </ComboBoxContainer>
    </>
  );
};

export const MealBox = () => {
  const MealTypes = ["아침", "점심", "저녁"];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");
  const [addedMeals, setAddedMeals] = useState({});

  const openModal = (mealType) => {
    setModalOpen(true);
    setSelectedMealType(mealType);
    console.log("테스트 : "+mealType);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ComboBoxContainer>
        <ComboSelectBox>
          {MealTypes.map((mealType) => (
            <ComboBox key={mealType}>
              <MealLabel>{mealType}</MealLabel>
              <MealInput>
                {Object.entries(addedMeals).map(([addedMealType, meal]) => {
                  if (addedMealType === mealType) {
                    return (
                      <div key={mealType}>
                        <h3>{addedMealType}</h3>
                        <h3>{meal}</h3>
                      </div>
                    );
                  }
                  return null;
                })}
              </MealInput>
              <AddButton onClick={() => openModal(mealType)}> + </AddButton>
            </ComboBox>
          ))}
        </ComboSelectBox>
      </ComboBoxContainer>
      <MiddleModal $isOpen={modalOpen} $onClose={closeModal}>
        <MealInputBox
          closeModal={closeModal}
          mealType={selectedMealType}
          setSelectedMealType={setSelectedMealType}
          // onAddItem={handleMealAdd}
        />
      </MiddleModal>
    </>
  );
};
