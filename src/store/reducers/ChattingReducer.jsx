import { CHANGE_CHAT } from '../actions/ChattingActions';
import { CHANGE_NUMBER } from './actionTypes';


//채팅 기본 이름과 벨류
const initialState = {
  state: 1,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHAT:
      return {
        ...state,
        [action.payload.numberId]: action.payload.value,
      };
    default:
      return state;
  }
};

export default chatReducer;
