import React, { useEffect, useState } from "react";
import CalendarCharts from "./CalendarCharts";
import CalendarModal from "./CalendarStyle";
import CalendarApi from "../../api/CalendarApi";
import {
  ComboBoxContainer,
  ComboBoxSection,
  ComboSelectBox,
  ComboBox,
  NavigationContainer,
  NavigationButton,
  DateDisplay,
  MealInput,
  MealTitle,
  MealInfoList,
  MealInfo,
  AddButton,
  InputField,
  InputAddBtn,
  SearchResultContainer,
  SearchResultItem,
  ToggleButton,
  WorkoutInfoList,
  MealInfoBox,
  WorkoutInfoBox,
  MealButtonBox,
  MealButton,
  MealDel,
  MealInfoArea,
} from "./CalendarStyle";
import { useCalendar } from "../../contexts/CalendarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const MealBox = () => {
  const { state, actions } = useCalendar();
  const MealTypes = ["아침", "점심", "저녁"];
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownWorkout, setDropdownWorkout] = useState(false);
  const [dropdownMeal, setDropdownMeal] = useState({
    아침: false,
    점심: false,
    저녁: false,
  });

  const openModal = (mealType) => {
    setModalOpen(true);
    actions.setMealType(mealType);
  };

  const closeModal = () => {
    setModalOpen(false);
    actions.setMealType("");
  };

  const getFormattedDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
  
    const date = new Date(`${year}-${month}-${day}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('ko-KR', options);
  };
  

  // 추가하기 클릭시 addState의 값은 false -> true , true -> 식으로 반전
  // 해당 값을 의존성배열에 넣고, 추가하기 버튼이 클릭 되었을때 재 랜더링한다
  useEffect(() => {
    const updateAfterInsert = async () => {
      try {
        // 데이터 추가 후 상태 업데이트를 위한 API 호출
        const response = await CalendarApi.getDetailsByCalendarId(
          state.calendarId
        );
        // 상태 업데이트
        actions.setDateData({
          meal: response.meal,
          workout: response.workout,
        });
      } catch (error) {
        console.error("상세 정보 조회 실패:", error);
      }
    };

    // 데이터 추가 플래그가 true일 경우에만 업데이트 함수 호출
    if (state.addState === true) {
      updateAfterInsert().then(() => {
        // 성공적인 업데이트 후 addState를 false로 재설정
        actions.setAddState(false);
      });
    }
  }, [state.addState, state.calendarId]);

  // const workoutDropdown = () => {
  //   setDropdownWorkout(!dropdownWorkout);
  // };
  const toggleDropdown = (mealType) => {
    setDropdownMeal((prevStates) => ({
      ...prevStates,
      [mealType]: !prevStates[mealType],
    }));
  };


  return (
    <>
      <ComboBoxContainer>
        <NavigationContainer>
          <NavigationButton onClick={actions.moveToPreviousDay}>
            {"<"}
          </NavigationButton>
          <DateDisplay>{getFormattedDate(state.selectedDate)}</DateDisplay>
          <NavigationButton onClick={actions.moveToNextDay}>
            {">"}
          </NavigationButton>
        </NavigationContainer>
        <CalendarCharts />
      </ComboBoxContainer>
      <CalendarModal $isOpen={modalOpen} $onClose={closeModal}>
        <MealInputBox modalOpen={modalOpen} closeModal={closeModal} />
      </CalendarModal>
    </>
  );
};

export const MealInputBox = ({ modalOpen, closeModal }) => {
  const { state, actions } = useCalendar();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null);
  };

  const handleSearchResultClick = async (item) => {
    console.log(item);
    setSelectedItem(item.name);
    setSearchQuery(item.name);
    console.log(state.mealType);
  };

  const handleCloseModal = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedItem("");
    closeModal(); // 부모 컴포넌트로부터 전달받은 closeModal 호출
  };

  const handleAddClick = async () => {
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      try {
        if (state.mealType === "운동") {
          // 운동에 대한 API 호출
          const addedWorkout = await actions.addWorkoutAndUpdate(
            state.email,
            state.selectedDate,
            selectedItem
          );
          // 운동 데이터 상태 업데이트
          actions.setDateData({
            ...state.dateData,
            workout: addedWorkout,
          });
        } else {
          // 식사에 대한 API 호출
          const addedMeal = await actions.addMealAndUpdate(
            state.email,
            state.mealType,
            state.selectedDate,
            selectedItem
          );
          // 식사 데이터 상태 업데이트
          actions.setDateData({
            ...state.dateData,
            meal: addedMeal,
          });
        }
        if (state.dateData) {
          actions.setAddState(true);
          handleCloseModal();
        }
      } catch (e) {
        console.error("데이터 처리 중 오류 발생", e);
      }
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      // setTimeout으로 검색쿼리 업데이트 이후 .1초뒤 api요청하게끔 조정
      if (searchQuery) {
        const fetchSearchResults = async () => {
          try {
            let result;
            if (state.mealType === "운동") {
              result = await CalendarApi.getExerciseList({
                keyword: searchQuery,
              });
            } else {
              result = await CalendarApi.getFoodList({
                keyword: searchQuery,
              });
            }
            setSearchResults(result);
          } catch (e) {
            console.log(e);
          }
        };
        fetchSearchResults();
      }
    }, 100);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // 모달이 열릴 때마다 searchQuery를 초기화
  useEffect(() => {
    if (modalOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedItem("");
    }
  }, [modalOpen]);

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

        {searchQuery && (
          <SearchResultContainer>
            {state.mealType === "운동"
              ? searchResults.map((item, index) => (
                  // 운동 검색 결과 렌더링
                  <SearchResultItem
                    key={index}
                    onClick={() => handleSearchResultClick(item)}>
                    <p className="workout-name">{item.name}</p>
                    <p className="workout-duration">{item.muscle}</p>
                    <p className="workout-intensity">{item.equipment}</p>
                  </SearchResultItem>
                ))
              : searchResults.map((item, index) => (
                  // 음식 검색 결과 렌더링
                  <SearchResultItem
                    key={index}
                    onClick={() => handleSearchResultClick(item)}>
                    <p className="food-name">{item.name}</p>
                    <p className="food-size">{item.servingSize}g</p>
                    <p className="food-kcal">{item.kcal}kcal</p>
                  </SearchResultItem>
                ))}
          </SearchResultContainer>
        )}

        <InputAddBtn onClick={() => handleAddClick()}>추가하기</InputAddBtn>
      </ComboBoxContainer>
    </>
  );
};
