export const CHANGE_NUMBER = 'CHANGE_NUMBER';

export const changeNumber = (numberId, value) => ({
  type: CHANGE_NUMBER,
  payload: { numberId, value },
});