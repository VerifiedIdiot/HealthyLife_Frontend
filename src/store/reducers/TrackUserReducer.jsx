// 액션에 해당하는 함수들을 취합하여 상태를 어떻게 변경 및 추적할지 정의하는 리듀서 함수 영역
// 어려워서 잠시 보류


// const initialState = {
//     entryTime: null,
//     exitTime: null,
//   };
  
//   const TrackUserReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'START_VISIT':
//         return { ...state, entryTime: action.payload };
//       case 'END_VISIT':
//         return { ...state, exitTime: action.payload };
//       default:
//         return state;
//     }
//   };
  
//   export default TrackUserReducer;