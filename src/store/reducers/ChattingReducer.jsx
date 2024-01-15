const ADD_MESSAGE = 'ADD_MESSAGE';
const SET_EXIT_TIME = 'SET_EXIT_TIME'; // 새로운 액션 타입 추가

const initialState = {
  messages: [],
  exitTime: null, // exitTime을 초기화
};

export const ChattingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: // 메세지가 쌓여야하는 구조 
      return { ...state, messages: [...state.messages, action.payload] };
    case SET_EXIT_TIME: //나가는 시간 action 
      return { ...state, exitTime: action.payload };
    default:
      return state;
  }
};


// 액션 선언
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const setExitTime = (exitTime) => ({ 
  type: SET_EXIT_TIME,
  payload: exitTime,
});