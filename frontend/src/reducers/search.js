import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    selectedUser: null,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state, action) => {
      state.selectedUser = null;
    },
  },
});

export const { setSearchResults, setSelectedUser, clearSelectedUser } = searchSlice.actions;



export default searchSlice.reducer;
