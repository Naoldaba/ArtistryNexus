import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postArt, getPortfolio } from '../actions/post';
const initialState = {
  isLoading: false,
  artPieces: null,
  error: null,
};


const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPostStatus(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postArt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postArt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artPieces.push(action.payload);
      })
      .addCase(postArt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getPortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artPieces = action.payload;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPostStatus } = postSlice.actions;
export default postSlice.reducer;
