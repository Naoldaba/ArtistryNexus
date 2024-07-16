import api from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, thunkAPI) => {
    console.log("ello", userData)
    try {
      const response = await api.post('/auth/signup', userData);
      console.log("res", response)
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
      console.log("res login", credentials)

      const response = await api.post('/auth/signin', credentials);
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
