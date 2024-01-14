
// 유저의 입장을 추적하는 action 개별 함수
export const startVisit = () => ({
    type: 'START_VISIT',
    payload: new Date(),
  });
  
export const endVisit = () => ({
    type: 'END_VISIT',
    payload: new Date(),
});