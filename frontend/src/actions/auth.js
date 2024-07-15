import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/signup', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
