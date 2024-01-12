import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  positions: [], 
};
//console.log(initialState);
export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    fetchPositions(state, action) {
      state.positions = [...action.payload];
    },
    
  },
});

export const { fetchPositions } = positionsSlice.actions;
export default positionsSlice.reducer;
