// 수정된 스토어 설정
import { configureStore } from '@reduxjs/toolkit';
// import TrackUserReducer from './reducers/TrackUserReducer';
import chatReducer from './reducers/ChattingReducer';

const Store = configureStore({
  reducer: {
    // visit: TrackUserReducer,
    message : chatReducer // 채팅리듀서추가
  },
});

export default Store;
