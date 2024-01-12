import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPositions, createPosition, updatePosition, deletePosition } from './path/to/your/crud-functions';

const initialState = {
  positions: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching positions
export const fetchPositionsAsync = createAsyncThunk('positions/fetchPositions', async () => {
  try {
    const positions = await getPositions();
    return positions;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw new Error('Failed to fetch positions');
  }
});

export const createPositionAsync = createAsyncThunk('positions/createPosition', async (data) => {
  try {
    const newPosition = await createPosition(data);
    return newPosition;
  } catch (error) {
    console.error('Error creating position:', error);
    throw new Error('Failed to create position');
  }
});

export const updatePositionAsync = createAsyncThunk('positions/updatePosition', async (data) => {
  try {
    const updatedPosition = await updatePosition(data);
    return updatedPosition;
  } catch (error) {
    console.error('Error updating position:', error);
    throw new Error('Failed to update position');
  }
});

export const deletePositionAsync = createAsyncThunk('positions/deletePosition', async (positionId) => {
  try {
    await deletePosition(positionId);
    return positionId;
  } catch (error) {
    console.error('Error deleting position:', error);
    throw new Error('Failed to delete position');
  }
});

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    createPositionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createPositionSuccess(state, action) {
      state.positions.push(action.payload);
      state.isLoading = false;
    },
    createPositionFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePositionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updatePositionSuccess(state, action) {
      const updatedPositionIndex = state.positions.findIndex(pos => pos.id === action.payload.id);
      if (updatedPositionIndex !== -1) {
        state.positions[updatedPositionIndex] = action.payload;
      }
      state.isLoading = false;
    },
    updatePositionFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deletePositionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deletePositionSuccess(state, action) {
      state.positions = state.positions.filter(pos => pos.id !== action.payload);
      state.isLoading = false;
    },
    deletePositionFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositionsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPositionsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePositionAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePositionAsync.fulfilled, (state, action) => {
        const updatedPositionIndex = state.positions.findIndex(pos => pos.id === action.payload.id);
        if (updatedPositionIndex !== -1) {
          state.positions[updatedPositionIndex] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updatePositionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deletePositionAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePositionAsync.fulfilled, (state, action) => {
        state.positions = state.positions.filter(pos => pos.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deletePositionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  createPositionStart,
  createPositionSuccess,
  createPositionFailure,
  updatePositionStart,
  updatePositionSuccess,
  updatePositionFailure,
  deletePositionStart,
  deletePositionSuccess,
  deletePositionFailure,
} = positionsSlice.actions;

export default positionsSlice.reducer;
