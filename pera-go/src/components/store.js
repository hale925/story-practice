import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './positionSlice'; // Import your position reducer

const store = configureStore({
  reducer: {
    positions: positionReducer, // Add the reducer to the store
  },
});

export default store;
