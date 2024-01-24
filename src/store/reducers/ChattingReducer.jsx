import { CHANGE_NUMBER } from './actionTypes';

const initialState = {
  number1: 1,
  number2: 2,
  number3: 3,
};

const numbersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NUMBER:
      return {
        ...state,
        [action.payload.numberId]: action.payload.value,
      };
    default:
      return state;
  }
};

export default numbersReducer;
