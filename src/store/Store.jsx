// 수정된 스토어 설정
import { configureStore } from '@reduxjs/toolkit';
// import TrackUserReducer from './reducers/TrackUserReducer';
import { ChattingReducer } from './reducers/ChattingReducer';

const store = configureStore({
  reducer: {
    // visit: TrackUserReducer,
    message : ChattingReducer // 채팅리듀서추가
  },
});

export default store;
