import styled from "styled-components";
import React, { useEffect, useState } from "react";
import MiddleModal from "../../styles/modals/MiddleModal";
import { useCalendar } from "../../contexts/CalendarContext";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import CalendarApi from "../../api/CalendarApi";
import moment from "moment";

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
  padding: 10px;
  margin: 10px;
`;

const SearchResultContainer = styled.div`
  height: auto;
  overflow-y: auto; // 높이 초과할 경우 스크롤바 생성
  p {
    margin: 0;
    padding: 5px;
  }
  @media (max-width: 768px) {
    height: auto;
  }
`;

// 식사 항목 검색 및 추가 컴포넌트
export const MealInutBox = ({
  closeModal,
  mealType,
  onAddItem,
  onMealAdd,
  globalAddedMeals,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const { updateAddedMeals } = useCalendar();

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null);
  };

  const handleSearchResultClick = async (item) => {
    setSelectedItem({ meal_name: item.name, meal_type: mealType });
    setSearchQuery(item.name);
    console.log(item.name);
  };

  const handleAddClick = async () => {
    if (selectedItem) {
      try {
        const mealDto = { ...selectedItem, meal_type: mealType };
        const savedItem = await CalendarApi.addMeal(mealDto);
        setSelectedItem(savedItem);
        onMealAdd(mealType, savedItem);
        console.log("savedItem:", savedItem);
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
  height: ${(props) => props.$width || "100%"};

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
    width: 100%;
  }
`;

const ComboBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

// 식사 유형 컴포넌트
export const MealBox = () => {
  const MealTypes = ["아침", "점심", "저녁"];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");
  const [addedMeals, setAddedMeals] = useState({ 아침:{}, 점심:{}, 저녁:{}});

  // addedMeals를 globalAddedMeals로 참조
  const { addedMeals: globalAddedMeals, updateAddedMeals } = useCalendar();

  // const [addedMeals, setAddedMeals] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openModal = (mealType) => {
    setSelectedMealType(mealType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMealAdd = (mealType, meal) => {
    setAddedMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: meal
    }));
    closeModal();
  };

  const handleSelectedItemChange = (item) => {
    setSelectedItem(item);
  };

  const fetchMealsByDate = async (date) => {
    try {
      const meals = await CalendarApi.getMealsByDate(date);
      updateAddedMeals(date, meals); // Context 함수 사용
    } catch (error) {
      console.error("식사 데이터 로딩 중 오류 발생", error);
    }
  };

  useEffect(() => {
    const fetchSelectedItem = async () => {
      try {
        const selectedItemData = await CalendarApi.MealDetail();
        setSelectedItem(selectedItemData);
      } catch (error) {
        console.error("데이터 가져오는 중 오류 발생", error);
      }
    };
    fetchSelectedItem();
  }, []);

  return (
    <>
      <ComboBoxContainer>
        <ComboSelectBox>
          {MealTypes.map((mealType) => (
            <ComboBox key={mealType}>
              <MealLabel>{mealType}</MealLabel>
              <MealInput> {selectedItem?.meal_name || ""} </MealInput>
              <AddButton onClick={() => openModal(mealType)}> + </AddButton>
            </ComboBox>
          ))}
        </ComboSelectBox>
      </ComboBoxContainer>
      <MiddleModal $isOpen={modalOpen} $onClose={closeModal}>
        <MealInutBox
          closeModal={closeModal}
          mealType={selectedMealType}
          selectedDate={selectedDate}
          globalAddedMeals={globalAddedMeals}
          onSelectedItemChange={handleSelectedItemChange}
          // onAddItem={handleMealAdd}
          onMealAdd={(meal) => handleMealAdd(selectedMealType, meal)}
        />
      </MiddleModal>
    </>
  );
};
