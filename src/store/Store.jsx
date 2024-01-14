// 수정된 스토어 설정
import { configureStore } from '@reduxjs/toolkit';
import TrackUserReducer from './reducers/TrackUserReducer';

const store = configureStore({
  reducer: {
    visit: TrackUserReducer,
  },
});

export default store;
